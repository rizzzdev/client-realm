interface HeaderPageProps {
  title: string;
  children: React.ReactNode;
}

const HeaderPage = (props: HeaderPageProps) => {
  return (
    <div className="w-full px-6 py-10 flex flex-col justify-center items-center mb-6 sticky top-0 bg-primary">
      <h3 className="text-3xl font-bold w-full text-center">{props.title}</h3>
      <p className="w-full text-center text-sm font-bold">{props.children}</p>
    </div>
  );
};

export default HeaderPage;
