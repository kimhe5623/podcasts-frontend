import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { Button } from "../components/button";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation"
import podcastLogo from "../images/podcasts-logo-main.png";
import { Link } from "react-router-dom";
import { Helmet} from 'react-helmet';
import { authToken, isLoggedInVar } from "../apollo";
import { EMAIL_REGEX, LOCALSTORAGE_TOKEN } from "../constants";

const LOGIN_MUTATION = gql`
    mutation loginMutation($input: LoginInput!) {
        login(input: $input) {
            ok
            error
            token
        }
    }
`;

interface ILoginForm {
    email: string;
    password: string;
}

export const Login = () => {
    const {
        register,
        getValues,
        errors,
        handleSubmit,
        formState,
    } = useForm<ILoginForm>({
        mode: "onChange"
    })
    const onCompleted = (data: loginMutation) => {
        const {
            login: { ok, token }
        } = data;
        if (ok && token) {
            localStorage.setItem(LOCALSTORAGE_TOKEN, token);
            authToken(token);
            isLoggedInVar(true);
        }
    }

    const [loginMutation, { data: loginMutationResult, loading }] = useMutation< // data -> loginMutationResult로 renaming
        loginMutation,
        loginMutationVariables
    >(LOGIN_MUTATION, {
        onCompleted,
    });
    const onSubmit = () => {
        if (!loading) {
            const { email, password } = getValues()
            loginMutation({
                variables: {
                    input: {
                        email,
                        password
                    },
                },
            });
        }
    };
    return (
        <div className="h-screen flex items-center flex-col p-10 lg:pt-32 bg-gradient-to-tl from-purple-500 via-purple-600 to-violet-800">
            <Helmet>
                <title>Login | Podcasts</title>
            </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col lg:px-16 px-5 py-16 items-center bg-white shadow-2xl rounded-lg">
                <img src={podcastLogo} className=" w-48 mb-5" alt="" />
                <h4 className="w-full text-left text-2xl font-semibold">Welcome back</h4>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid gap-3 pt-5 w-full mb-4"
                >
                    <input
                        ref={register({
                            required: "Email is required",
                            pattern: EMAIL_REGEX,
                        })}
                        name="email"
                        type="email"
                        placeholder="Email"
                        className="input" />
                    {errors.email?.message && (
                        <FormError errorMessage={errors.email?.message} />
                    )}
                    {errors.email?.type === "pattern" && (
                        <FormError errorMessage="Please enter a valid email" />
                    )}
                    <input
                        ref={register({ required: "Password is required" })}
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="input" />
                    {errors.password?.message && (
                        <FormError errorMessage={errors.password?.message} />
                    )}
                    {errors.password?.type === "minLength" && (
                        <FormError errorMessage="Password must be more than 10 chars." />
                    )}
                    <Button canClick={formState.isValid} loading={loading} actionText="Log In"></Button>
                    {loginMutationResult?.login.error && <FormError errorMessage={loginMutationResult.login.error} />}
                </form>
                <div>
                    New to Ouber? <Link to="/create-account" className="text-lime-600 hover:underline">Create an Account</Link>
                </div>
            </div>
        </div>
    );
};