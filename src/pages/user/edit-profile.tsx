import { gql, useMutation } from '@apollo/client';
import React from'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { EMAIL_REGEX, TITLE } from '../../constants';
import { useMe } from '../../hooks/useMe';
import { editProfileMutation, editProfileMutationVariables } from '../../__generated__/editProfileMutation';

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email: string;
  password: string;
}

export const EditProfile = () => {
  const {
    register,
    getValues,
    handleSubmit,
    errors,
    formState,
    setValue
  } = useForm<IFormProps>({
    mode: "onChange"
  })

  
  const { data: meData } = useMe();

  const onCompleted = (data: editProfileMutation) => {
    const {
      editProfile: { ok }
    } = data;
    if(ok) {
      alert("Your profile was successfully edited!");
      setValue("password", "");
    }
  }

  const [editProfileMutation, { data: editProfileResult, loading }] = useMutation<
    editProfileMutation,
    editProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted
  });

  const onSubmit = () => {
    if(!loading) {
      let { email, password } = getValues();
      editProfileMutation({
        variables: {
          input: {
            ...(email !== "" && email !== meData?.me.email && { email }),
            ...(password !== "" && { password }),
          }
        }
      });
    }
  };

  return(
    <div className="h-screen flex items-center flex-col p-10 lg:pt-32 bg-violet-100">
      <Helmet>
        <title>Edit Profile | {`${TITLE}`}</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col lg:px-16 px-5 py-16 items-center bg-white shadow-2xl rounded-lg">
        <div className="text-3xl font-bold text-gray-800 mb-5">Edit Profile</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 pt-5 w-full mb-4"
        >
          <input
            ref={register({
              pattern: EMAIL_REGEX
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            defaultValue={meData?.me.email}
          />
          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter a valid email" />
          )}

          <input
            ref={register}
            name="password"
            type="password"
            placeholder="New password"
            className="input" />
            {errors.password?.type === "minLength" && (
                <FormError errorMessage="Password must be more than 10 chars." />
            )}

          <Button canClick={formState.isValid} loading={loading} actionText="Update Profile"></Button>
          {editProfileResult?.editProfile.error && <FormError errorMessage={editProfileResult.editProfile.error} />}
        </form>
      </div>
    </div>
  );
}