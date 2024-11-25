# Assignment - 5 (LWS)

## Live Link: https://quiz-app-assignment-5-lws.vercel.app/

# Extra Features:

- Added Quiz resume feature.

# Requirements:

✓ হোম পেজে আপনারা কিছু কুইজ এর কার্ড দেখতে পারবেন । কুইজ কার্ড এ ক্লিক করলে আপনাকে "quiz_page" পেজ এ নিয়ে যাবে । তবে এক্ষেত্রে একটি জিনিস খেয়াল রাখতে হবে । আপনি যদি লগইন থাকেন, তাহলেই কুইজ পেজ এ যেতে পারবেন । অন্যথায়, আপনাকে লগইন পেজে নিয়ে যেতে হবে । হোম পেজে কুইজ নিয়ে আসার জন্যে `Quiz List` API ব্যবহার করতে হবে ।

✓ যদি ইউজার লগইন অবস্থায় থাকে, তবে হোম পেজে Welcome Section দেখা যাবে । অন্যথায় হাইড থাকবে ।

✓ একজন ইউজার একটি কুইজ শুধু মাত্র একবারই অংশগ্রহণ করতে পারবে । পরবর্তীতে, কুইজ কার্ডে ক্লিক করলে রেজাল্ট পেজ (_result.html_) এ নিয়ে যাবে।

✓ কুইজ পেজে (_quiz_page.html_) গেলে আপনি একটি একটি করে প্রশ্ন দেখতে পারবেন । একটি প্রশ্নের উত্তর সিলেক্ট করার পরে Next বাটনে ক্লিক করলে পরের প্রশ্ন আসবে । তবে `Get Quiz` API থেকে আপনি সব গুলো কুইজের প্রশ্ন এক সাথেই পাবেন । কিন্তু আপনাকে একটি একটি করে প্রশ্ন দেখাতে হবে। Next বাটনে ক্লিক করলে যেন পরের প্রশ্ন আসে ।

✓ কুইজ পেজে প্রতিটি প্রশ্নের অপশন গুলো Randomly Rotate করবে। অর্থাৎ একই অপশন কারো জন্যে A তে পারে, আবার কারো জন্যে B হতে পারে ।

✓ কুইজ পেজ এর সাইড বার এ আপনাকে দেখাতে হবে, এই **কুইজ সেট** এ মোট কতটি প্রশ্ন আছে, আপনি কত গুলো প্রশ্নের উত্তর দিয়েছেন এবং মোট কত গুলো বাকি আছে ।

✓ সব গুলো কুইজ এর উত্তর দিয়ে সাবমিট করতে `Submit Quiz Attempt` API ব্যবহার করতে হবে । `Submit Quiz Attempt` API এ ইউজার এর ইনপুট গুলো সাবমিট করলে API এর রেসপন্স এ User এর `Submitted Answer` এবং `Correct Answer` এর একটি Array রেসপন্স পাবেন। আপনাকে Client সাইডে ইউজারের মার্ক ক্যাল্কুলেট করে রেজাল্ট পেজে রেজাল্ট দেখাতে হবে ।

✓ সব গুলো কুইজ এর উত্তর সিলেক্ট করে সাবমিট করার পর আপনাকে রেজাল্ট পেজে (_result.html_) নিয়ে যাবে । সেখানে কুইজের মার্ক দেখাতে হবে। কত গুলো ভুল উত্তর, এবং কত গুলো সঠিক উত্তর সেটি সেখানে দেখাতে হবে ।

✓ রেজাল্ট পেজ (_result.html_) আপনাকে একটি Cicular Progress Bar দেখাতে হবে । আমরা, আমাদের Template এ একটি ছবি দিয়ে বুঝিয়ে দিয়েছি Cicular Progress Bar টি দেখতে কেমন হবে । আপনাকে npm repository থেকে আপনার পছন্দ মত যে কোনো লাইব্রেরি ব্যাবহার করে সেটি বানাতে হবে । কুইজে অংশগ্রহণ করা ব্যাক্তি কত পার্সেন্ট উত্তর সঠিক দিয়েছে সেটি Cicular Progress Bar এ দেখাতে হবে ।

✓ রেজাল্ট পেজ (_result.html_) এর ডান পাশে যেই অংশ আছে সেখানে আপনাকে কুইজের উত্তর গুলো দেখাতে হবে । ইউজার যেই ইনপুট দিয়েছে, সেই ইনপুট এর মধ্যে কোন গুলো সঠিক, কোন গুলো ভুল, কোন গুলো ইউজার সিলেক্ট করেছিল, কোন গুলো ইউজার সিলেক্ট করেছিল কিন্তু ভুল সেগুলো বিভিন্ন রঙ বা আইকন দিয়ে চিহ্নিত করে দিতে হবে। এক্ষেত্রে আপনি আপনার মন মত DOM বা ডিজাইন পরিবর্তন **করতে পারবেন** । কিন্তু উদ্দেশ্য হবে ইউজার এর ইনপুট, সঠিক উত্তর, ভুল উত্তর যেন আমরা সহজেই বুঝতে পারি । `Get Quiz Attempts` API থেকে আপনারা, ইউজার কোন গুলো ইনপুট দিয়েছে, সেগুলোর একটি Array তে পাবেন । এবং প্রত্যেক প্রশ্নের সঠিক উত্তর কোন গুলো সেটি অন্য একটি Array তে পাবেন । এই দুই Array কে কম্বাইন করে আপনাকে ইউজার এর কোন উত্তর সঠিক এবং কোন গুলো ভুল এটি বের করতে হবে । এই কাজটি আপনাকে ক্লায়েন্ট সাইডেই করতে হবে । যদিও এটি সাধারণত সার্ভার সাইডে করা হয়, তবে যেহেতু এটি একটি ফ্রন্টএন্ড এসাইনমেন্ট সেহেতু আপনাকে ক্লায়েন্ট সাইডে কাজটি করতে হবে ।

✓ রেজাল্ট পেজ এ "View Leaderboard" নামে একটি লিংক দেখতে পারবেন । সেখানে ক্লিক করলে আপনাকে লিডারবোর্ড পেজ (_leaderboard_page.html_) এ নিয়ে যাবে । সেখানে আপনাকে সেই **কুইজ সেট** এর লিডার্বোড দেখাতে হবে । Participant এর পজিশন, Correct, Wrong Answer এর সংখ্যা দেখাতে হবে, যেভাবে Template এ দেয়া আছে । ডান পাশে Top 5 এর একটি লিস্ট দেখাতে হবে । তবে খেয়াল রাখবেন, Leaderboard কুইজ সেট Specific অর্থাৎ, ইউজার যেই কুইজ সেট এ অংশ গ্রহণ করেছে, শুধু মাত্র সেই কুইজ সেট এরই Leaderboard দেখাবে। প্রতিটি কুইজ সেট এর জন্যে আলাদা আলাদা লিডার বোর্ড থাকবে ।

✓ লিডারবোর্ড পেজ (_leaderboard_page.html_) এ যদি Top 5 এর মধ্যে নিজের নাম থাকে, সেক্ষেত্রে সেটি highlight করে দেখাতে হবে ।

✓ **কুইজ সেট** এর লিডার্বোড এর ডেটা দেখাতে `Get Quiz Attempts` API ব্যবহার করতে হবে । API থেকে আপনারা লিডারবোর্ড এর Sorted Data পাবেন না । আমরা API থেকে শুধু মাত্র যারা যারা অংশগ্রহণ করেছে তাদের সিলেক্ট করা উত্তর গুলো গুলোর একটি List পাঠিয়ে দিবো, আপনাদের ক্লায়েন্ট ইউজারের সিলেক্ট করা উত্তর গুলোর মধ্যে কোন গুলো সঠিক ভুল নির্নয় করে, মার্কসীট তৈরি করে, লিডারবোর্ড জেনারেট করতে হবে । যদিও লিডারবোর্ড সার্ভার সাইডে জেনারেট করতে হয়, যেহেতু এটি একটি এসাইনমেন্ট সেহেতু আপনাকে ক্লায়েন্ট সাইডে লিডারবোর্ড জেনারেট করতে হবে ।

✓ ইউজার লগইন এবং রেজিস্টার এর ক্ষেত্রে ম্যানুয়াল ফর্ম লগইন ইমপ্লিমেন্ট করতে হবে। এবং পুরো এপ্লিকেশনে JWT টোকেন এর মাধ্যমে Authentication ইমপ্লিমেন্ট করতে হবে । ইউজার এর Avater এর ক্ষেত্রে যেকোনো Default Avater দিয়ে দিতে পারেন । Login, Registration এবং Refresh Token এর জন্যে যথাযত API দেয়া হয়েছে সেগুলো ব্যবহার করে করতে হবে ।

✓ প্রাইভেট রাউট এবং পাবলিক রাউট ম্যানেজ করতে হবে । অর্থাৎ যেই রাউট গুলো প্রাইভেট করা দরকার সেগুলোতে যেন লগইন ছাড়া কেউ যেতে না পারে। কোন কোন পেজ গুলো প্রাইভেট রাউট করতে হবে, সেগুলো আমরা বলে দিবো না । আপনাকে আপনার বিচক্ষণতার সাথে সিদ্ধান্ত নিয়ে কাজটি করতে হবে ।

✓ "dist" ফোল্ডার এর ভেতরে "admin" নামে আরো একটি ফোল্ডার রয়েছে। সেই পেজ গুলো শুধু মাত্র এডমিন ভিউ করতে পারবে । আমাদের দেয়া API তে ইউজার এর "role" নামে একটি প্রোপার্টি থাকবে, সেটি দিয়ে ইউজার Admin নাকি User সেটি সিদ্ধান্ত নিতে পারবেন ।

✓ ** dashboard.html ** এ গেলে আপনারা খুব সিম্পল একটি ড্যাসবোর্ড দেখতে পারবেন । সেখানে সেই এডমিন কি কি কুইজ তৈরি করেছে, তার লিস্ট থাকবে । `Quiz Set List` থেকে লিস্ট ড্যাসবোর্ড এ কুইজ গুলো নিয়ে এসে দেখাতে হবে ।

✓ ড্যাসবোর্ড পেজ থেকে "Create a new quiz" কার্ডে ক্লিক করলে, নতুন কুইজ তৈরি করার জন্যে quiz_set_page.html পেজে নিয়ে যেতে হবে ।

✓ সেখানে **কুইজ সেট** এর Title, Description সেট করে Next বাটনে ক্লিক করলে পরের পেজে যাবেন । নতুন কুইজ সেট তৈরি করতে আপনাকে `Create Quiz Set` API ব্যবহার করতে হবে । প্রাথমিক অবস্থায়, কুইজ সেট Draft হিসেবে থাকবে।

✓ কুইজ সেট পেজ থেকে Next বাটনে ক্লিক করলে কুইজ এন্ট্রি পেজে নিয়ে যাবে (quiz_set_entry_page.html) । সেখানে নতুন কুইজ তৈরি করার জন্যে Create Quiz সেকশন দেখতে পারবেন । সেখানে থেকে কুইজ এর টাইটেল এবং অপশন দিয়ে "Save Quiz" বাটনে ক্লিক করলে নতুন কুইজ তৈরি হবে । এবং সেটি ডান পাশের লিস্ট এ দেখাবে । প্রতিটি প্রশ্ন এড করার জন্যে আপনাকে `Add Question` API ব্যবহার করতে হবে ।

✓ এটি খেয়াল রাখতে হবে, একটি কুইজের শুধু মাত্র একটি মাত্র সঠিক উত্তর হতে পারবে ।

✓ কুইজ এন্ট্রি পেজে অর্থাৎ quiz_set_page.html পেজে আপনাদের একটি বাটন তৈরি করতে হবে, যেটি দিয়ে Admin একটি কুইজ সেট কে Publish এবং Unpublish করে রাখতে পারবে । যেহেতু, কুইজ সেট তৈরির পরে স্বাভাবিক ভাবেই কুইজ সেটটি `draft` অবস্থায় থাকবে। সেহেতু সেটিকে পাবলিশ করার ব্যবস্থা করতে হবে । এবং সেটির জন্যে `Update Quiz` API ব্যবহার করতে হবে ।

✓ আপনাদের এক একটি Quiz Question ডিলিট এবং আপডেট করার ব্যবস্থা করতে হবে । এক্ষত্রে `Delete Quiz` এবং `Update Quiz` API ব্যবহার করতে হবে ।

# Overall Requirements

- শুধুমাত্র Vite প্রজেক্ট সেটআপ দিয়েই এসাইনমেন্টটি করতে হবে। অন্য কোন ফ্রেমওয়ার্ক বা অন্য কোন সেটআপ গ্রহণযোগ্য নয়।
- TypeScript ব্যবহার করা যাবেনা।
- এসাইনমেন্ট সাবমিট করার সময় API Deploy করতে হবে না । আপনি শুধু React এ করা আপনার Frontend Deploy করে লিংক সাবমিট করবেন ।
- API Server 5000 Port এ চলবে এবং http://localhost:5000 হবে আপনার Base URL । আপনি এসাইনমেন্ট করার সময় API Server এর পোর্ট পরিবর্তন করবেন না ।
- আমাদের দিয়ে দেয়া API Server এর কোডে আপনি কোন পরিবর্তন করতে পারবেন না । করলেও সেটা কোন কাজে আসবেনা কারণ আমরা আমাদের API সার্ভার চালিয়ে তারপর আপনাদের বানানো Front-end দেখবো।
- আপনারা প্রোজেক্ট Improvement এবং Innovation এর জন্যে npm থেকে যে কোনো লাইব্রেরি ব্যবহার করতে পারবেন ।

আপনি এই এসাইনমেন্টে যত বেশি বেস্ট প্র্যাকটিস, ইনোভেশন করতে পারবেন, তত বেশি মার্ক পাবেন। Extraordinary কাজের জন্য আমরা বোনাস মার্কও দিয়ে দিতে পারি। এখানে

# To Run Locally

1. **Clone the repository:**

   ```
   git clone https://github.com/Learn-with-Sumit/batch-2-assignment-5-quiz-application-nasib15
   ```

2. **Install the dependencies:**

   ```
   npm install
   ```

3. **Start the development server:**

   ```
   npm run dev
   ```

# Build for Production:

```
npm run build
```
