import { useState } from "react"
import { Link } from 'react-router-dom'
import api from "../Api"
import { TOKEN } from "./constants"
import { useNavigate } from "react-router-dom"
export default function LoginForm({ route, method }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(null)
  const navigate = useNavigate()
  const name = method === 'login' ? 'Login' : 'Signup'
  const [confirm_password, setConfirm_Password] = useState("")

  // clear form data
  const ClearForm = () => {
    setConfirm_Password('')
    setUsername('')
    setPassword('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (method === 'register' & password !== confirm_password) {
      setShowError('Password and Confirm Passoword is incorrect !')
      ClearForm()
    }
    else {
      try {
        setIsLoading(true)
        const res = await api.post(route, { username, password });
        localStorage.setItem(TOKEN, res.data.token)
        ClearForm()
        navigate('/')
      } catch (error) {
        if (error.response.status === 404) {
          setShowError('Username or Password is incorrect !')
        }
      } finally {
        setIsLoading(false)
      }
    }


  }
  return (
    <>
      <form onSubmit={handleSubmit} className="p-5  flex flex-col space-y-5 w-full shadow-md">
        <div className="">
          <p className="text-center text-red-600 mb-2">{showError}</p>
          <h2 className="mb-10 text-center text-3xl font-semibold">{method === 'login' ? 'Login' : 'Signup'}</h2>
        </div>
        <div className="">
          <input type="text" name="username" id="username" className=" w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
        </div>
        <div className="">
          <input type="password" name="password" id="password" className=" w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          {method === 'login' && <Link className="text-sm hover:underline">Forgetten passoword ?</Link>}
        </div>
        <div className="">
          {method === 'register' && <input type="password" name="confirm_password" id="confirm_password" className="w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="Confirm Password" onChange={(e) => setConfirm_Password(e.target.value)} value={confirm_password} required />}
        </div>
        <div className="">
          <p className="text-center text-[13px]">{method === 'login' ? 'Don\'t have an account ? ' : 'Already have an account ? '}<Link className="hover:underline text-blue-700" to={method === 'login' ? '/register' : '/login'}>{method === 'login' ? 'Register' : 'Login'}</Link>
          </p>
        </div>
        <button type="submit" className="py-2 text-lg px-4 bg-blue-500 text-white font-medium rounded">{name}</button>
      </form>
    </>
  )
}
