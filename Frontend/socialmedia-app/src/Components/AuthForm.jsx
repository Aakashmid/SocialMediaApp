import { useState } from "react"
import { Link } from 'react-router-dom'
import { TOKEN, USER_ID } from "./constants"
import { useNavigate } from "react-router-dom"
import { CircleLoader } from "./Loader"
import api from "../api"
import { set } from "date-fns"

// handing register and login operations
export default function AuthForm({ route, method, setIsAuthorized }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
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
    setFullName('')
  }

  // handling submission of  login  and  register
  const handleSubmit = async (e) => {
    e.preventDefault()
    var payload = { username: username, password: password };

    if (method === 'register') {
      payload.full_name = fullName;
    }
    if (method === 'register' && password !== confirm_password) {
      setShowError('Password and Confirm Password do not match!')
      ClearForm()
    }
    else {
      try {
        setIsLoading(true)
        const res = await api.post(route, payload);
        if (res && res.data) {
          localStorage.setItem(TOKEN, res.data.token)
          localStorage.setItem(USER_ID, res.data.user.id) // set user id in local storage
          console.log(res.data);
          console.log('logged in or registered');
          setIsAuthorized(true);
          ClearForm();
          navigate('/');

        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setShowError('Username or password is wrong ! ');
        }
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="p-5 flex flex-col space-y-5 w-full shadow-md">
        {isLoading && <CircleLoader />}
        <div className="">
          <p className="text-center text-red-600 mb-2">{showError || ''}</p>
          <h2 className="mb-10 text-center text-3xl font-semibold">{method === 'login' ? 'Login' : 'Signup'}</h2>
        </div>
        {method === 'register' && (
          <div className="">
            <input type="text" name="full_name" id="full_name" className="w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} value={fullName} required />
          </div>
        )}
        <div className="">
          <input type="text" name="username" id="username" className="w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="Username" onChange={(e) => setUsername(e.target.value)} value={username} required />
        </div>
        <div className="">
          <input type="password" name="password" id="password" className="w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
          {method === 'login' && <Link className="text-sm hover:underline">Forgotten password?</Link>}
        </div>
        {method === 'register' && (
          <div className="">
            <input type="password" name="confirm_password" id="confirm_password" className="w-full focus:outline-none px-3 py-2 text-lg border rounded-md focus:outline-blue-500" placeholder="Confirm Password" onChange={(e) => setConfirm_Password(e.target.value)} value={confirm_password} required />
          </div>
        )}
        <div className="">
          <p className="text-center text-[13px]">{method === 'login' ? 'Don\'t have an account? ' : 'Already have an account? '}<Link className="hover:underline text-blue-700" to={method === 'login' ? '/auth/register' : '/auth/login'}>{method === 'login' ? 'Register' : 'Login'}</Link>
          </p>
        </div>
        <button type="submit" className="py-2 text-lg px-4 bg-blue-500 transition-colors duration-200 hover:bg-blue-600 text-white font-medium rounded">{name}</button>
      </form>
    </>
  )
}
