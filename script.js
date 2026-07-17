// ========================================
// مدیریت تب‌ها
// ========================================
function switchTab(tabName) {
    // مخفی کردن همه تب‌ها
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // غیرفعال کردن همه دکمه‌ها
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // نمایش تب انتخاب شده
    document.getElementById(`${tabName}-tab`).classList.add('active');
    event.target.classList.add('active');
}

// ========================================
// چت بات (شبیه‌سازی با پاسخ‌های هوشمند)
// ========================================
const chatHistory = [];
const persianResponses = {
    greetings: [
        "سلام! خوبی؟ چطور می‌تونم کمکت کنم؟",
        "سلام سلام! چه خبر؟",
        "درود بر تو! چطور می‌تونم کمک کنم؟"
    ],
    weather: [
        "متأسفانه من به اطلاعات آب و هوا دسترسی ندارم، ولی می‌تونی از سایت‌های هواشناسی استفاده کنی!",
        "هوا همیشه برای کسایی که عاشق زندگی‌ان عالیه! ☀️"
    ],
    help: [
        "من می‌تونم تو این موارد کمکت کنم:\n• پاسخ به سؤالات عمومی\n• تولید محتوا\n• تحلیل احساسات\n• خلاصه‌سازی متن",
        "هر سؤالی داری بپرس! من اینجام تا کمکت کنم 🤖"
    ],
    jokes: [
        "چرا برنامه‌نویس‌ها قاطی می‌کنن؟ چون همشون توی دنیای صفر و یک زندگی می‌کنن! 😄",
        "یه کامپیوتر به کامپیوتر دیگه میگه: «دوست دارم» اونم میگه: «System Error: Love.exe not found» 😂"
    ],
    coding: [
        "برنامه‌نویسی عالیه! پیشنهاد می‌کنم با Python یا JavaScript شروع کنی 🚀",
        "برای یادگیری برنامه‌نویسی، سایت‌های freeCodeCamp و W3Schools عالی‌ان"
    ],
    default: [
        "سؤال جالبیه! بیشتر توضیح میدی؟",
        "متوجه شدم. اجازه بده یه کم فکر کنم... 🤔",
        "می‌تونی یه کم بیشتر توضیح بدی؟"
    ]
};

function getAIResponse(userInput) {
    const input = userInput.toLowerCase();
    
    // تحلیل احساسات ساده
    if (input.includes('سلام') || input.includes('خوبی') || input.includes('چطوری')) {
        return randomFromArray(persianResponses.greetings);
    }
    if (input.includes('هوا') || input.includes('آب و هوا') || input.includes('بارون')) {
        return randomFromArray(persianResponses.weather);
    }
    if (input.includes('کمک') || input.includes('راهنما') || input.includes('چه کاری')) {
        return randomFromArray(persianResponses.help);
    }
    if (input.includes('جوک') || input.includes('خنده') || input.includes('بامزه')) {
        return randomFromArray(persianResponses.jokes);
    }
    if (input.includes('کد') || input.includes('برنامه') || input.includes('پایتون') || input.includes('جاوا')) {
        return randomFromArray(persianResponses.coding);
    }
    
    // پاسخ‌های پیشرفته‌تر
    if (input.includes('اسمت') || input.includes('کی هستی')) {
        return 'من دستیار هوش مصنوعی هستم که با JavaScript ساخته شدم! می‌تونم به سؤالاتت جواب بدم 🤖✨';
    }
    
    if (input.includes('عاشق') || input.includes('دوست')) {
        return 'عشق چیز قشنگیه! ولی من یه رباتم و قلب ندارم ❤️😅';
    }
    
    if (input.includes('خداحافظ') || input.includes('بای')) {
        return 'خداحافظ! منتظرتم تا دوباره برگردی 👋😊';
    }
    
    // پاسخ هوشمند بر اساس طول متن
    if (input.length > 100) {
        return 'متن طولانی‌ای نوشتی! به نظر می‌رسه موضوع برات مهمه. بیشتر توضیح بده تا بهتر کمکت کنم 📝';
    }
    
    return randomFromArray(persianResponses.default);
}

function randomFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function chatWithAI() {
    const input = document.getElementById('chatInput');
    const userMessage = input.value.trim();
    
    if (!userMessage) return;
    
    // نمایش لودینگ
    const loader = document.getElementById('chatLoader');
    loader.classList.remove('hidden');
    
    // اضافه کردن پیام کاربر
    addMessage(userMessage, 'user');
    chatHistory.push({ role: 'user', content: userMessage });
    
    // پاک کردن input
    input.value = '';
    
    // شبیه‌سازی تأخیر پردازش (مثل API واقعی)
    setTimeout(() => {
        const botResponse = getAIResponse(userMessage);
        addMessage(botResponse, 'bot');
        chatHistory.push({ role: 'assistant', content: botResponse });
        loader.classList.add('hidden');
        
        // اسکرول به پایین چت
        const chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000 + Math.random() * 1000);
}

function addMessage(text, sender) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// ========================================
// تولید محتوا
// ========================================
const contentTemplates = {
    blog: (topic, tone) => `${getTonePrefix(tone)} در این مقاله می‌خواهیم درباره "${topic}" صحبت کنیم.

مقدمه:
در دنیای امروز، ${topic} به یکی از موضوعات مهم و مورد بحث تبدیل شده است. بسیاری از افراد به دنبال راهکارهای مؤثر در این زمینه هستند.

بدنه اصلی:
تحقیقات نشان می‌دهد که توجه به ${topic} می‌تواند تأثیر قابل توجهی در کیفیت زندگی داشته باشد. در ادامه به بررسی دقیق‌تر این موضوع می‌پردازیم:

۱. اهمیت ${topic} در زندگی روزمره
۲. روش‌های کاربردی برای بهبود ${topic}
۳. نکات کلیدی و توصیه‌های متخصصان

نتیجه‌گیری:
با توجه به مطالب گفته شده، می‌توان نتیجه گرفت که ${topic} نقش مهمی در موفقیت و پیشرفت دارد. پیشنهاد می‌کنیم این نکات را در زندگی خود به کار بگیرید.`,
    
    social: (topic, tone) => `${getToneEmoji(tone)} ${getTonePrefix(tone)}

✨ ${topic} رو جدی بگیر!

آیا می‌دونستی که ${topic} می‌تونه زندگی‌تو متحول کنه؟ 😍

🔥 ۳ نکته طلایی:
1️⃣ همیشه به روز باش
2️⃣ تجربه‌های دیگران رو مطالعه کن
3️⃣ عملگرا باش و شروع کن

👥 تو هم تجربه‌ای داری؟ کامنت کن! 

#${topic.replace(/\s/g, '_')} #موفقیت #توسعه_فردی #آموزش`,
    
    email: (topic, tone) => `موضوع: ${topic} - پیشنهاد ویژه برای شما

سلام دوست عزیز،

امیدوارم حالت عالی باشه! 🌟

می‌خواستم این فرصت استثنایی رو باهات به اشتراک بذارم. ما یه راهکار فوق‌العاده برای "${topic}" داریم که می‌تونه کمک بزرگی بهت بکنه.

ویژگی‌های منحصر‌به‌فرد:
✅ کاملاً کاربردی و اثبات شده
✅ پشتیبانی ۲۴ ساعته
✅ گارانتی بازگشت وجه

برای اطلاعات بیشتر روی لینک زیر کلیک کن:
[لینک ویژه]

با احترام،
تیم ما 🚀`,
    
    product: (topic, tone) => `معرفی محصول: ${topic}

${getStars(5)}

توضیحات محصول:
این محصول فوق‌العاده برای "${topic}" طراحی شده و با استفاده از جدیدترین تکنولوژی‌های روز دنیا ساخته شده است.

مشخصات فنی:
🔹 جنس: درجه یک
🔹 وزن: مناسب و قابل حمل
🔹 رنگ: متنوع
🔹 گارانتی: ۱۲ ماهه

مزایا:
✨ کیفیت عالی
✨ قیمت مناسب
✨ طراحی ارگونومیک
✨ نصب آسان

همین حالا سفارش دهید! 📦`
};

function getTonePrefix(tone) {
    const prefixes = {
        formal: 'با سلام و احترام،',
        friendly: 'سلام رفیق! 👋',
        humorous: 'سلام به همه بچه‌های باحال! 😎',
        professional: 'با عرض سلام خدمت همراهان گرامی،'
    };
    return prefixes[tone] || '';
}

function getToneEmoji(tone) {
    const emojis = {
        formal: '📢',
        friendly: '🤗',
        humorous: '😄',
        professional: '💼'
    };
    return emojis[tone] || '📌';
}

function getStars(count) {
    return '⭐'.repeat(count);
}

function generateContent() {
    const topic = document.getElementById('contentTopic').value.trim();
    const contentType = document.getElementById('contentType').value;
    const contentTone = document.getElementById('contentTone').value;
    
    if (!topic) {
        alert('لطفاً موضوع محتوا را وارد کنید!');
        return;
    }
    
    const loader = document.getElementById('contentLoader');
    loader.classList.remove('hidden');
    
    setTimeout(() => {
        const template = contentTemplates[contentType];
        const content = template(topic, contentTone);
        
        document.getElementById('contentResult').textContent = content;
        document.getElementById('generatedContent').classList.remove('hidden');
        loader.classList.add('hidden');
        
        // اسکرول به نتیجه
        document.getElementById('generatedContent').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

function copyContent() {
    const content = document.getElementById('contentResult').textContent;
    navigator.clipboard.writeText(content).then(() => {
        alert('✅ محتوا با موفقیت کپی شد!');
    });
}

// ========================================
// تحلیل احساسات
// ========================================
function analyzeSentiment() {
    const text = document.getElementById('sentimentInput').value.trim();
    
    if (!text) {
        alert('لطفاً متنی برای تحلیل وارد کنید!');
        return;
    }
    
    const loader = document.getElementById('sentimentLoader');
    loader.classList.remove('hidden');
    
    setTimeout(() => {
        const result = simpleSentimentAnalysis(text);
        
        // به‌روزرسانی Emoji
        const emojiMap = {
            positive: '😊',
            neutral: '😐',
            negative: '😢'
        };
        
        document.getElementById('sentimentEmoji').textContent = emojiMap[result.dominant];
        document.getElementById('dominantSentiment').textContent = {
            positive: 'مثبت',
            neutral: 'خنثی',
            negative: 'منفی'
        }[result.dominant];
        
        // به‌روزرسانی نمودار
        document.getElementById('positiveBar').style.width = result.positive + '%';
        document.getElementById('neutralBar').style.width = result.neutral + '%';
        document.getElementById('negativeBar').style.width = result.negative + '%';
        
        document.getElementById('positivePercent').textContent = Math.round(result.positive) + '%';
        document.getElementById('neutralPercent').textContent = Math.round(result.neutral) + '%';
        document.getElementById('negativePercent').textContent = Math.round(result.negative) + '%';
        
        document.getElementById('sentimentResult').classList.remove('hidden');
        loader.classList.add('hidden');
        
        document.getElementById('sentimentResult').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
}

function simpleSentimentAnalysis(text) {
    const positiveWords = ['خوب', 'عالی', 'فوق‌العاده', 'دوست', 'شاد', 'خوشحال', 'موفق', 'قشنگ', 'زیبا', 'بهترین', 'خوش', 'عالیه', 'محشر', 'فوق‌العادست', 'لذت', 'آرامش', 'سلامتی', '♥', '❤️', '😊', '👍', '💪', 'خند'];
    const negativeWords = ['بد', 'ناراحت', 'غمگین', 'عصبانی', 'متنفر', 'زشت', 'شکست', 'درد', 'رنج', 'ناامید', 'افسرده', 'خسته', 'بدبخت', 'ضعیف', 'بدتر', '😢', '😡', '👎', 'گریه', 'اشک'];
    
    const words = text.split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
        if (positiveWords.some(pw => word.includes(pw))) positiveCount++;
        if (negativeWords.some(nw => word.includes(nw))) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    
    if (total === 0) {
        return { positive: 50, neutral: 50, negative: 0, dominant: 'neutral' };
    }
    
    const positivePercent = (positiveCount / words.length) * 100;
    const negativePercent = (negativeCount / words.length) * 100;
    const neutralPercent = 100 - positivePercent - negativePercent;
    
    let dominant;
    if (positivePercent > negativePercent) dominant = 'positive';
    else if (negativePercent > positivePercent) dominant = 'negative';
    else dominant = 'neutral';
    
    return {
        positive: Math.max(0, positivePercent),
        neutral: Math.max(0, neutralPercent),
        negative: Math.max(0, negativePercent),
        dominant
    };
}

// ========================================
// خلاصه‌سازی متن
// ========================================
function summarizeText() {
    const text = document.getElementById('summaryInput').value.trim();
    const length = document.getElementById('summaryLength').value;
    
    if (!text) {
        alert('لطفاً متنی برای خلاصه‌سازی وارد کنید!');
        return;
    }
    
    if (text.split(/\s+/).length < 10) {
        alert('متن باید حداقل ۱۰ کلمه باشد!');
        return;
    }
    
    const loader = document.getElementById('summaryLoader');
    loader.classList.remove('hidden');
    
    setTimeout(() => {
        const summary = extractiveSummary(text, length);
        document.getElementById('summaryText').textContent = summary;
        document.getElementById('summaryResult').classList.remove('hidden');
        loader.classList.add('hidden');
        
        document.getElementById('summaryResult').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}

function extractiveSummary(text, length) {
    // تقسیم متن به جملات
    const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
    
    if (sentences.length === 1) return text;
    
    // محاسبه امتیاز هر جمله بر اساس:
    // ۱. طول جمله (جملات با طول متوسط امتیاز بیشتری دارند)
    // ۲. موقعیت جمله (جملات اول و آخر مهم‌ترند)
    // ۳. کلمات کلیدی
    
    const wordFrequency = {};
    const words = text.split(/\s+/);
    
    words.forEach(word => {
        if (word.length > 3) {
            wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        }
    });
    
    const scoredSentences = sentences.map((sentence, index) => {
        let score = 0;
        const sentenceWords = sentence.split(/\s+/);
        
        // امتیاز بر اساس فراوانی کلمات
        sentenceWords.forEach(word => {
            if (wordFrequency[word]) {
                score += wordFrequency[word];
            }
        });
        
        // نرمال‌سازی با طول جمله
        score = score / sentenceWords.length;
        
        // امتیاز موقعیت
        if (index === 0) score *= 1.5; // جمله اول
        if (index === sentences.length - 1) score *= 1.3; // جمله آخر
        
        return { sentence, score, index };
    });
    
    // مرتب‌سازی و انتخاب جملات برتر
    scoredSentences.sort((a, b) => b.score - a.score);
    
    const sentenceCount = {
        short: Math.min(3, sentences.length),
        medium: Math.min(5, sentences.length),
        long: Math.min(8, sentences.length)
    }[length];
    
    const selectedSentences = scoredSentences
        .slice(0, sentenceCount)
        .sort((a, b) => a.index - b.index); // حفظ ترتیب اصلی
    
    return selectedSentences.map(s => s.sentence).join(' ');
}

function copySummary() {
    const summary = document.getElementById('summaryText').textContent;
    navigator.clipboard.writeText(summary).then(() => {
        alert('✅ خلاصه با موفقیت کپی شد!');
    });
}

// ========================================
// اضافه کردن فونت فارسی
// ========================================
(function addPersianFont() {
    const link = document.createElement('link');
    link.href = 'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
})();

// ========================================
// نمایش تاریخ و زمان در کنسول
// ========================================
console.log('🚀 جعبه ابزار هوش مصنوعی آماده استفاده است!');
console.log('📅 ' + new Date().toLocaleDateString('fa-IR'));
console.log('💡 راهنما: از تب‌های بالا برای استفاده از ابزارهای مختلف استفاده کنید.');
