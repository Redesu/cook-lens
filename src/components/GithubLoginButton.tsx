export default function GithubLoginButtion() {
    return (
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
    );
}