"use client"

import LoginRegisterForm from "~/components/layouts/LoginRegisterForm"
import { useAppSelector, useAppDispatch } from "~/redux/hooks"
import { setRegister } from "~/redux/slices/userSlice"

const Page = () => {
  const registerState = useAppSelector(state => state.user.register)
  const dispatch = useAppDispatch()

  return (
    <LoginRegisterForm>
      <LoginRegisterForm.Header
        text="Silahkan registrasi untuk memulai belajar di Realm!"
      />
      <LoginRegisterForm.Input
        name="nama-depan"
        placeholder="Nama Depan"
        type="text"
        state={registerState.firstName}
        onChange={e => dispatch(setRegister({...registerState, firstName: e.target.value}))}
      />
      <LoginRegisterForm.Input
        name="nama-belakang"
        placeholder="Nama Belakang"
        type="text"
        state={registerState.lastName}
        onChange={e => dispatch(setRegister({...registerState, lastName: e.target.value}))}
      />
      <LoginRegisterForm.Input
        name="username"
        placeholder="Username"
        type="text"
        state={registerState.lastName}
        onChange={e => dispatch(setRegister({...registerState, username: e.target.value}))}
      />
      <LoginRegisterForm.Input
        name="password"
        placeholder="Password"
        type="password"
        state={registerState.lastName}
        onChange={e => dispatch(setRegister({...registerState, password: e.target.value}))}
      />
      <LoginRegisterForm.Input
        name="confirm-password"
        placeholder="Konfirmasi Password"
        type="password"
        state={registerState.lastName}
        onChange={e => dispatch(setRegister({...registerState, confirmPassword: e.target.value}))}
      />
      <LoginRegisterForm.Button
        text="REGISTRASI"
      />
    </LoginRegisterForm>
  )
}

export default Page