const ComingSoon = () => {
  return (
    <div className="w-full h-[calc(100vh-80px)] p-2 flex justify-center items-center gap-2">
      <div className="w-full h-full overflow-y-scroll no-scrollbar text-white">
        <div className="w-full min-h-full flex justify-center items-center p-2 gap-2 bg-primary rounded-md">
          <h3 className="w-full text-3xl md:text-4xl text-center font-bold">
            THIS FEATURE WILL BE AVAILABLE SOON!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
