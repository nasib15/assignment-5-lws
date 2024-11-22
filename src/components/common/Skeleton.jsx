export const CardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative animate-pulse bg-white">
      <div className="w-full h-[450px] bg-gray-200"></div>
    </div>
  );
};

export const QuestionSkeleton = () => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-4 h-full">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg"
          >
            <div className="h-4 w-4 bg-gray-200 rounded-full shrink-0"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AdminDashboardSkeleton = () => {
  return (
    <div className="flex-grow p-10">
      <header className="mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded-md animate-pulse mb-2"></div>
        <div className="h-12 w-96 bg-gray-200 rounded-md animate-pulse"></div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="w-10 h-10 bg-gray-200 rounded-md animate-pulse mb-4"></div>
            <div className="h-6 w-32 bg-gray-200 rounded-md animate-pulse mb-2"></div>
            <div className="h-4 w-40 bg-gray-200 rounded-md animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfileBannerSkeleton = () => {
  return (
    <div className="bg-white p-6 rounded-md mb-8 animate-pulse h-full">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    </div>
  );
};

export const QuizSetPageSkeleton = () => {
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex">
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="inline-flex items-center text-sm text-gray-600 mb-6">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="h-10 w-3/4 bg-gray-200 rounded-md mb-6 animate-pulse"></div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-32 w-full bg-gray-200 rounded-md animate-pulse"></div>
              </div>

              <div className="space-y-2">
                <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex items-center space-x-4">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-full h-10 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export const QuizSetEntrySkeleton = () => {
  return (
    <div className="bg-[#F5F3FF] min-h-screen flex flex-1">
      <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <nav className="text-sm mb-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-6 w-64 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-5 w-96 bg-gray-200 rounded mb-8 animate-pulse"></div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
                </div>

                <div className="space-y-4">
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 px-4 py-3 rounded-md bg-white"
                    >
                      <div className="h-4 w-4 bg-gray-200 rounded-full animate-pulse"></div>
                      <div className="h-8 w-full bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>

                <div className="h-12 w-full bg-gray-200 rounded-md animate-pulse"></div>
              </div>
            </div>

            <div className="px-4 space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-lg shadow-sm animate-pulse"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="h-6 w-3/4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div
                        key={j}
                        className="flex items-center space-x-3 p-2 rounded"
                      >
                        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
