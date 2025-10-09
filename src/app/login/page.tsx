export default function Login() {
    return (

        <div className="min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Sign In</h2>
                <button className="gsi-material-button w-full ">
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" className="block">
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span className="gsi-material-button-contents">Continue with Google</span>
                        <span className="hidden">Continue with Google</span>
                    </div>
                </button>
                <button className="gsi-material-button w-full mt-4 gsi-material-button gsi-material-button-github w-full">
                    <div className="gsi-material-button-state"></div>
                    <div className="gsi-material-button-content-wrapper">
                        <div className="gsi-material-button-icon">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="block">
                                <path fill="#FFFFFF" d="M24 0C10.74 0 0 10.74 0 24c0 10.62 6.88 19.59 16.41 22.76 1.2.22 1.64-.52 1.64-1.16 0-.57-.02-2.09-.03-4.1-6.68 1.45-8.09-3.22-8.09-3.22-1.09-2.77-2.67-3.51-2.67-3.51-2.18-1.49.16-1.46.16-1.46 2.41.17 3.68 2.48 3.68 2.48 2.14 3.67 5.62 2.61 6.99 2 .22-1.55.84-2.61 1.52-3.21-5.33-.61-10.93-2.67-10.93-11.87 0-2.62.94-4.76 2.48-6.44-.25-.61-1.08-3.05.24-6.36 0 0 2.02-.65 6.61 2.46 1.92-.53 3.98-.8 6.02-.81 2.04.01 4.1.28 6.02.81 4.59-3.11 6.61-2.46 6.61-2.46 1.32 3.31.49 5.75.24 6.36 1.54 1.68 2.48 3.82 2.48 6.44 0 9.22-5.61 11.26-10.95 11.85.86.74 1.63 2.21 1.63 4.45 0 3.21-.03 5.8-.03 6.58 0 .64.43 1.39 1.65 1.16C41.13 43.59 48 34.62 48 24c0-13.26-10.74-24-24-24z"></path>
                            </svg>
                        </div>
                        <span className="gsi-material-button-contents">Continue with GitHub</span>
                        <span className="hidden">Continue with GitHub</span>
                    </div>
                </button>
            </div>
        </div >

    )
}