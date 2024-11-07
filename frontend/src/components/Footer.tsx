const Footer = () => {
  return (
    <footer className="footer bg-base-200 text-neutral-content items-center p-4 fixed bottom-0">
      <aside className="grid-flow-col items-center">
        <img
          src="https://media.licdn.com/dms/image/v2/D5603AQGURmWiLFFWbA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728748139342?e=1736380800&v=beta&t=B_Dg5hkXhwPiXzngYZfn0Q3BsZ3tl3ZySk_7TXee098"
          alt="pic"
          className="w-8 remove-bg rounded-full"
        />
        <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://www.linkedin.com/in/rishav-chatterjee-fsd/" className="cursor-pointer" target="_blank">
          <svg
            xmlns="http://www.w3.org/1999/xlink"
            version="1.1"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path
              d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z"
            />
          </svg>
        </a>
        <a href="https://www.youtube.com/channel/UCrN6JNTsY3dlAL_Q713AlNg" className="cursor-pointer" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      </nav>
    </footer>
  );
};

export default Footer;
