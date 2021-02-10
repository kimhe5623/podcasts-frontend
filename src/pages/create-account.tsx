import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { Button } from "../components/button";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation"
import podcastLogo from "../images/podcasts-logo-main.png";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';
import { UserRole } from "../__generated__/globalTypes";
import { EMAIL_REGEX } from "../constants";

const CREATE_ACCOUNT_MUTATION = gql`
    mutation createAccountMutation($input: CreateAccountInput!) {
        createAccount(input: $input) {
            ok
            error
        }
    }
`;

interface ICreateAccountForm {
    email: string;
    password: string;
    role: UserRole;
}

export const CreateAccount = () => {
    const {
        register,
        getValues,
        errors,
        handleSubmit,
        formState,
    } = useForm<ICreateAccountForm>({
        mode: "onChange",
        defaultValues: {
            role: UserRole.Listener
        }
    });

    const history = useHistory();
    const onCompleted = (data: createAccountMutation) => {
        const {
            createAccount: { ok }
        } = data;
        if (ok) {
            alert("Account Created! Log in now!")
            history.push("/");
        }
    };

    const [loginMutation, { data: createAccountMutationResult, loading }] = useMutation< // data -> loginMutationResult로 renaming
        createAccountMutation,
        createAccountMutationVariables
    >(CREATE_ACCOUNT_MUTATION, {
        onCompleted
    });

    const onSubmit = () => {
        if (!loading) {
            const { email, password, role } = getValues()
            loginMutation({
                variables: {
                    input: {
                        email,
                        password,
                        role,
                    },
                },
            });
        }
    };
    return (
        <div className="h-screen flex items-center flex-col p-10 lg:pt-32 bg-gradient-to-tl from-purple-500 via-purple-600 to-violet-800">
            <Helmet>
                <title>Create Account | Ouber Eats</title>
            </Helmet>
            <div className="w-full max-w-screen-sm flex flex-col lg:px-16 px-5 py-16 items-center bg-white shadow-2xl rounded-lg">
                <img src={podcastLogo} className="w-48 mb-10" alt="" />
                <h4 className="w-full text-left text-2xl font-semibold">Let's get started</h4>
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
                    <select 
                        ref={register({ required: true })} 
                        name="role" 
                        className="input">
                        {Object.keys(UserRole).map(role => <option>{role}</option>)}
                    </select>
                    <Button canClick={formState.isValid} loading={loading} actionText="Create Account"></Button>
                    { createAccountMutationResult?.createAccount.error && <FormError errorMessage={createAccountMutationResult.createAccount.error}></FormError>}
                </form>
                <div>
                Already use Podcast? <Link to="/" className="text-lime-600 hover:underline">Log In</Link>
                </div>
            </div>
        </div>
    );
};