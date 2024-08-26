import tictactoeLogo from "../assets/images/tictactoe-logo.png";

export default function MainLayout({ children }) {
  return (
    <div className='w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url("./assets/images/bg-3.gif")] content-center'>
      <div className="flex justify-center items-center flex-col gap-20">
        <img src={tictactoeLogo} className="w-1/2" alt="tic-tac-toe" />
        {children}
      </div>
    </div>
  );
}
