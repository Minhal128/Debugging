/** @format */

const Button = ({ children, className, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-center items-center gap-2  py-2 bg-btnColor hover:bg-secondary text-textPrimary drop-shadow-md rounded-md ${className ?  className :  "w-full"}`}
    >
      {children}
    </button>
  );
};

export default Button;
