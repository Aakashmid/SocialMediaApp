import LoginForm from "../Components/LoginForm";


export default function Registration() {
    return (
        <div className="registration-page min-h-[100vh] bg-gray-100 flex">
            <div className="registration-page-wrapper flex   lg:space-x-[30px] items-center    mx-auto w-full  md:w-11/12 lg:w-[1200px] px-5 ">
                <div className="login-left hidden lg:block">
                    <h1 className="login-logo text-[50px] font-bold text-blue-600">Buzzline</h1>
                    <p className="login-desc text-2xl text-wrap">Connect with friends and the world around you on Buzzline.</p>
                </div>
                <div className="login-form w-full  sm:mx-auto sm:w-[500px] rounded-md bg-white">
                    <LoginForm method={'register'} route={'register/'} />
                </div>
            </div>
        </div>
    )
}
