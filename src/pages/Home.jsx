import { Helmet } from "react-helmet";
import Footer from "../components/home/Footer";
import Navbar from "../components/home/Navbar";
import ProfileBanner from "../components/home/ProfileBanner";
import QuizList from "../components/home/QuizList";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { auth } = useAuth();
  console.log(auth);

  return (
    <>
      <Helmet>
        <title>Quiz | Home</title>
      </Helmet>
      <div className="bg-[#F5F3FF] min-h-screen">
        <div className="container mx-auto py-3">
          {/* Navbar */}
          <Navbar />

          {/* Profile Banner */}
          {auth?.user && <ProfileBanner />}

          {/* Main */}
          <main className="bg-white p-6 rounded-md h-full">
            <section>
              <h3 className="text-2xl font-bold mb-6">
                Participate In Quizees
              </h3>

              {/* Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <QuizList />
                {/* <a
                href="./quiz_page.html"
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative"
              >
                <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className=" text-5xl">JavaScript Basic Quiz</h1>
                  <p className="mt-2 text-lg">
                    Test your knowledge of JavaScript basics with quizzes that
                    cover essential concepts, syntax, and foundational
                    programming skills
                  </p>
                </div>
                <img
                  src="./assets/backgrounds/3.jpg"
                  alt="JavaScript Hoisting"
                  className="w-full h-full object-cover rounded mb-4 transition-all "
                />
              </a>

              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] cursor-pointer group relative">
                <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className=" text-5xl">JavaScript Basic Quiz</h1>
                  <p className="mt-2 text-lg">
                    Test your knowledge of JavaScript basics with quizzes that
                    cover essential concepts, syntax, and foundational
                    programming skills
                  </p>
                </div>
                <img
                  src="./assets/backgrounds/5.jpg"
                  alt="JavaScript Hoisting"
                  className="w-full h-full object-cover rounded mb-4 transition-all "
                />
              </div>

              <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer ">
                <div className="absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className=" text-5xl">JavaScript Basic Quiz</h1>
                  <p className="mt-2 text-lg">
                    Test your knowledge of JavaScript basics with quizzes that
                    cover essential concepts, syntax, and foundational
                    programming skills
                  </p>
                </div>
                <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                  <div>
                    <h1 className="text-3xl font-bold">Already Participated</h1>
                    <p className="text-center">You got 20 out of 50</p>
                  </div>
                </div>
                <img
                  src="./assets/backgrounds/1.jpeg"
                  alt="JavaScript Hoisting"
                  className="w-full h-full object-cover rounded mb-4 "
                />
              </div> */}
              </div>
            </section>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
};
export default Home;
