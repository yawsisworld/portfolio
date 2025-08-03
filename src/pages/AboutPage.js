import { useTranslation } from 'react-i18next';

function AboutPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const isRtl = lang === 'fa';

  const bio = {
    en: "Yasamin Vosoughi is a 24-year-old Persian miniature artist currently living in Tehran. She holds a Bachelor’s degree in Persian Miniature Painting and is completing her Master’s thesis in the same field. With a deep passion for both abstract paintings and detailed Persian miniatures, Yasamin is fascinated by colors and their combinations. She also explores jewelry design, blending her expertise in miniatures with delicate craftsmanship.",
    fa: "یاسمین وثوقی، هنرمند ۲۴ ساله نقاشی مینیاتور پارسی، ساکن تهران است. او دارای مدرک کارشناسی در نقاشی مینیاتور پارسی است و در حال تکمیل پایان‌نامه کارشناسی ارشد خود در همین رشته می‌باشد. یاسمین با اشتیاق فراوان به نقاشی‌های انتزاعی و مینیاتورهای پارسی دقیق، به رنگ‌ها و ترکیب‌های آن‌ها علاقه‌مند است. او همچنین در طراحی جواهرات فعالیت دارد و تخصص خود در مینیاتور را با ظرافت این هنر تلفیق می‌کند."
  };

  return (
    <div
      className="bg-white p-6 min-h-screen flex justify-center"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      <div className="max-w-2xl w-full">
        <h1 className={`text-3xl font-vazirmatn text-center text-gray-800 ${isRtl ? 'text-right' : 'text-left'}`}>
          {t('about')}
        </h1>
        <img
          src="./assets/images/Yasamin.jpg"
          alt="Yasamin Vosoughi"
          className="w-full max-w-sm mx-auto h-auto rounded-lg shadow-md mt-6"
        />
        <p className={`mt-6 text-center font-semibold text-lg text-gray-800 ${isRtl ? 'text-right' : 'text-left'}`}>
          {lang === 'en' ? "Artist Statement" : "سخن هنرمند"}
        </p>
        <p className={`mt-3 text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
          {lang === 'en'
            ? "My art reflects the harmony of tradition and imagination, weaving stories through intricate details and vibrant colors."
            : "هنرم بازتاب هماهنگی سنت و تخیل است، داستان‌هایی که از طریق جزئیات پیچیده و رنگ‌های زنده بافته می‌شوند."}
        </p>
        <p className={`mt-6 text-center font-semibold text-lg text-gray-800 ${isRtl ? 'text-right' : 'text-left'}`}>
          {lang === 'en' ? "About Yasamin" : "درباره یاسمین"}
        </p>
        <p className={`mt-4 text-gray-700 leading-relaxed ${isRtl ? 'text-right' : 'text-left'}`}>
          {bio[lang]}
        </p>
        <div className={`mt-6 flex justify-center space-x-6 ${isRtl ? 'space-x-reverse' : ''}`}>
          <a
            href="https://www.instagram.com/yawsisworld/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-500 transition-colors mx-6 duration-200"
          >
            Instagram
          </a>
          <a
            href="mailto:yawsisworld@gmail.com"
            className="text-gray-600 hover:text-blue-500 transition-colors duration-200"
          >
            Email
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;