const Loading = () => {
  return (
    <div className="flex items-center justify-center  bg-black">
      <div className="relative w-5 h-5">
        <div className="absolute inset-0 rounded-full border border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-white border-r-white animate-spin"></div>
      </div>
    </div>
  )
}
export default Loading;