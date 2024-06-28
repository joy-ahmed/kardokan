import SignupForm from "../../_components/SignupForm";

const SignUpPage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100">
      <div className="hidden h-screen md:block w-1/2">
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          alt="E-commerce"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 p-5">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUpPage;
