export const Backdrop = ({ hidecart }) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-[#00000040] z-20"
      onClick={hidecart}
    ></div>
  );
};
export default Backdrop;
