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
