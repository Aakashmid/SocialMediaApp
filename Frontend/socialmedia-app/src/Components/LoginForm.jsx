import { useState } from "react"
import { Link } from 'react-router-dom'
export default function LoginForm({ route, method }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const name = method === 'login' ? 'Login' : 'Signup'
  if (method === 'register') {
    const [confirm_password, setConfirm_Password] = useState("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="p-5  flex flex-col space-y-5 w-full">
        <div className="">
          <input type="text" name="username" id="username" className=" w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="username" required />
        </div>
        <div className="">
          <input type="password" name="password" id="password" className=" w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="password" required />
        </div>
        <div className="">
          {method === 'register' && <input type="password" name="confirm_password" id="confirm_password" className="w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="confirm_password" required />}
          <Link className="text-sm hover:underline">Forget passoword ?</Link>
        </div>
        <div className="">
          <p className="text-center text-[13px]"><Link className="hover:underline text-blue-700" to={method === 'login' ? '/register' : '/login'}>{method === 'login' ? 'Register' : 'Login'}</Link></p>
        </div>
        <button type="submit" className="py-2 text-lg px-4 bg-blue-500 text-white font-medium rounded">{name}</button>
      </form>
    </>
  )
}
