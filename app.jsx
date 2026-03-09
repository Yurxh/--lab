const { useState, useEffect, useRef } = React;
const { HashRouter, Routes, Route, NavLink, useNavigate, useParams, useLocation } = window.ReactRouterDOM;
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } = window.Recharts;

// ------------- ICONS -------------
const Icons = {
    Home: ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    Interview: ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>,
    Written: ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Reply: ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    Record: ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    Profile: ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    Play: ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>,
    Send: ({ className }) => <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
};

// ------------- LAYOUT -------------
const SidebarItem = ({ to, icon, label }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) => `flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-200 ${isActive ? 'bg-apple-primary/10 text-apple-primary font-bold' : 'text-apple-text hover:bg-black/5 font-medium'}`}
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};

const Sidebar = () => {
    return (
        <nav className="w-64 h-screen fixed left-0 top-0 glass-sidebar flex flex-col p-4 md:p-6 z-50">
            <div className="mb-10 px-2 flex items-center space-x-3 mt-4">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#ff5e62] to-[#fa243c] shadow-lg shadow-apple-primary/30 flex items-center justify-center text-white font-black text-xl">I</div>
                <h1 className="text-xl font-bold tracking-tight">Inter<span className="text-apple-primary">Prep</span></h1>
            </div>

            <div className="space-y-1 flex-1">
                <div className="mb-2 px-4 text-xs font-semibold text-apple-subtext uppercase tracking-wider">探索</div>
                <SidebarItem to="/" icon={<Icons.Home className="w-5 h-5" />} label="训练总览" />

                <div className="mt-8 mb-2 px-4 text-xs font-semibold text-apple-subtext uppercase tracking-wider">开始演练</div>
                <SidebarItem to="/interview" icon={<Icons.Interview className="w-5 h-5" />} label="面试训练" />
                <SidebarItem to="/written" icon={<Icons.Written className="w-5 h-5" />} label="笔试训练" />
                <SidebarItem to="/reply" icon={<Icons.Reply className="w-5 h-5" />} label="智能回复" />

                <div className="mt-8 mb-2 px-4 text-xs font-semibold text-apple-subtext uppercase tracking-wider">我的数据</div>
                <SidebarItem to="/record" icon={<Icons.Record className="w-5 h-5" />} label="训练记录" />
                <SidebarItem to="/profile" icon={<Icons.Profile className="w-5 h-5" />} label="个人背景" />
            </div>
        </nav>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 md:p-12 lg:p-16 transition-all pb-32 max-w-7xl mx-auto">
                {children}
            </main>
        </div>
    );
};

// ------------- PAGES -------------

// 1. Home Page
const HomePage = () => {
    return (
        <div className="animate-fade-in-up space-y-10">
            <header className="flex justify-between items-end border-b border-gray-200 pb-6">
                <div>
                    <p className="text-apple-subtext font-semibold uppercase tracking-wider text-sm mb-1">今日概况</p>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">准备好迎接挑战了吗？</h1>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-400 to-apple-blue flex items-center justify-center text-white font-bold shadow-lg">ME</div>
            </header>

            {/* 统计卡片 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 flex flex-col justify-between h-40 group cursor-pointer">
                    <h3 className="text-apple-subtext font-medium text-sm">累计训练次数</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-bold text-apple-text tracking-tight group-hover:scale-105 transition-transform origin-left">128</span>
                        <span className="text-apple-subtext font-medium">次</span>
                    </div>
                </div>
                <div className="glass-card p-6 flex flex-col justify-between h-40 group cursor-pointer bg-gradient-to-br from-white to-red-50">
                    <h3 className="text-apple-primary font-medium text-sm">平均正确率</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-bold text-apple-primary tracking-tight group-hover:scale-105 transition-transform origin-left text-gradient-primary">85</span>
                        <span className="text-apple-primary font-bold text-xl">%</span>
                    </div>
                </div>
                <div className="glass-card p-6 flex flex-col justify-between h-40 group cursor-pointer bg-gradient-to-br from-white to-blue-50">
                    <h3 className="text-apple-blue font-medium text-sm">连续打卡</h3>
                    <div className="flex items-baseline space-x-2">
                        <span className="text-5xl font-bold text-apple-blue tracking-tight group-hover:scale-105 transition-transform origin-left text-gradient-blue">12</span>
                        <span className="text-apple-blue font-bold text-xl">天</span>
                    </div>
                </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* 今日推荐 */}
                <section className="col-span-2 space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight">今日推荐</h2>
                    <div className="relative rounded-[2.5rem] overflow-hidden shadow-apple-lg group cursor-pointer h-80 flex items-end">
                        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-[#1a1a2e] to-[#16213e] z-0 transition-transform duration-700 group-hover:scale-105"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>

                        <div className="relative z-20 p-8 md:p-10 w-full flex justify-between items-end">
                            <div>
                                <p className="text-apple-subtext uppercase tracking-widest text-xs font-bold mb-3 drop-shadow-md">精选模拟题</p>
                                <h3 className="text-white text-3xl font-bold mb-2">React 原理剖析</h3>
                                <p className="text-gray-300 font-medium max-w-sm">深入理解 Fiber 架构与 Hooks 运行机制，夯实前端进阶基石。</p>
                            </div>
                            <button className="h-14 w-14 rounded-full bg-apple-primary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-[0_0_20px_rgba(250,36,60,0.5)]">
                                <Icons.Play className="w-6 h-6 ml-1" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* 训练计划进度 */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold tracking-tight flex justify-between items-center">
                        计划进度
                        <span className="text-sm font-medium text-apple-blue cursor-pointer hover:underline">查看全部</span>
                    </h2>
                    <div className="glass-card p-6 h-80 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-lg mb-1">春招冲刺计划</h3>
                            <p className="text-sm text-apple-subtext mb-6">距离目标还有 14 天</p>

                            <div className="space-y-5">
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span>算法数据结构</span>
                                        <span className="text-apple-subtext">80%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-apple-blue rounded-full transition-all duration-1000" style={{ width: '80%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span>前端工程化</span>
                                        <span className="text-apple-subtext">45%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-apple-primary rounded-full transition-all duration-1000 delay-100" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2 font-medium">
                                        <span>计算机网络</span>
                                        <span className="text-apple-subtext">60%</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-apple-green rounded-full transition-all duration-1000 delay-200" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-apple-text font-bold rounded-2xl transition-colors">
                            继续打卡
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
};

// 2. Interview Prep Page
const InterviewPage = () => {
    const [messages, setMessages] = useState([
        { role: 'system', content: '您好！我是您的 AI 面试官。我们今天将进行前端方向的模拟面试。请问您可以做个简单的自我介绍吗？' }
    ]);
    const [input, setInput] = useState('');
    const [isThinking, setIsThinking] = useState(false);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput('');
        setIsThinking(true);

        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'system',
                content: '很好的自我介绍。那么接下来，能详细说说你在上一个项目中是如何优化 React 应用性能的吗？用到了哪些具体的 API 或排查工具？'
            }]);
            setIsThinking(false);
        }, 1500);
    };

    return (
        <div className="animate-fade-in-up h-[calc(100vh-80px)] flex flex-col">
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-4xl font-bold tracking-tight">模拟面试</h1>
                <div className="flex space-x-3">
                    <select className="bg-white border-none shadow-sm rounded-xl px-4 py-2 font-medium text-sm focus:ring-2 focus:ring-apple-primary outline-none cursor-pointer">
                        <option>前端开发</option>
                        <option>后端开发</option>
                        <option>产品经理</option>
                    </select>
                    <select className="bg-white border-none shadow-sm rounded-xl px-4 py-2 font-medium text-sm focus:ring-2 focus:ring-apple-primary outline-none cursor-pointer">
                        <option>中等难度</option>
                        <option>困难</option>
                        <option>专家</option>
                    </select>
                    <button className="bg-apple-primary text-white rounded-xl px-5 py-2 font-bold text-sm shadow-md hover:bg-apple-primaryHover transition-colors">
                        重新开始
                    </button>
                </div>
            </header>

            <div className="flex-1 glass-card flex flex-col overflow-hidden relative border border-gray-100/50">
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.role === 'system' && (
                                <div className="w-10 h-10 rounded-full bg-apple-blue/10 flex items-center justify-center mr-3 flex-shrink-0">
                                    <span className="text-apple-blue font-bold">AI</span>
                                </div>
                            )}
                            <div className={`max-w-[75%] rounded-3xl p-5 ${msg.role === 'user'
                                ? 'bg-apple-blue text-white rounded-tr-sm shadow-md'
                                : 'bg-[#f2f2f7] text-apple-text rounded-tl-sm shadow-sm'
                                }`}>
                                <p className="leading-relaxed font-medium">{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    {isThinking && (
                        <div className="flex justify-start animate-fade-in-up">
                            <div className="w-10 h-10 rounded-full bg-apple-blue/10 flex items-center justify-center mr-3">
                                <span className="text-apple-blue font-bold">AI</span>
                            </div>
                            <div className="bg-[#f2f2f7] rounded-3xl p-5 rounded-tl-sm flex items-center space-x-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 md:p-6 bg-white/80 backdrop-blur-md border-t border-gray-100">
                    <div className="relative flex items-center">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="描述你的想法..."
                            className="w-full bg-[#f2f2f7] rounded-3xl py-4 pl-6 pr-16 resize-none focus:outline-none focus:ring-2 focus:ring-apple-primary/30 transition-all font-medium text-apple-text shadow-inner"
                            rows="1"
                            style={{ minHeight: '56px' }}
                        />
                        <button
                            onClick={handleSend}
                            className={`absolute right-2 p-2 rounded-full flex items-center justify-center transition-all ${input.trim() ? 'bg-apple-blue text-white shadow-md hover:scale-105' : 'bg-gray-200 text-gray-400'
                                }`}
                            disabled={!input.trim()}
                        >
                            <Icons.Send className="w-5 h-5 ml-1" />
                        </button>
                    </div>
                    <div className="mt-4 flex justify-between items-center px-2">
                        <p className="text-xs text-apple-subtext font-medium">按 Enter 发送，Shift + Enter 换行</p>
                        <button className="text-sm font-bold text-apple-primary hover:underline">
                            结束模拟并生成评价
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 3. Written Prep Page
const WrittenPage = () => {
    const [status, setStatus] = useState('setup'); // setup, playing, result
    const [timeLeft, setTimeLeft] = useState(30 * 60);

    useEffect(() => {
        let timer;
        if (status === 'playing' && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [status, timeLeft]);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    if (status === 'setup') {
        return (
            <div className="animate-fade-in-up space-y-8 max-w-4xl mx-auto">
                <header>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">笔试训练</h1>
                    <p className="text-apple-subtext font-medium text-lg">配置你的专属模拟考场，计时作答，真实还原。</p>
                </header>

                <div className="glass-card p-8 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">选择科目</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['数据结构', '计算机网络', '操作系统', '前端工程', 'JavaScript', 'React', 'TypeScript', '系统设计'].map(subject => (
                                <button key={subject} className="py-3 px-4 rounded-xl border-2 border-transparent bg-[#f2f2f7] hover:bg-gray-200 hover:border-apple-primary/30 transition-all font-bold text-apple-text text-sm cursor-pointer">
                                    {subject}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-xl font-bold mb-4">题型生成设置</h3>
                        <div className="flex flex-wrap gap-6">
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-apple-primary focus:ring-apple-primary accent-apple-primary" />
                                <span className="font-medium group-hover:text-apple-primary transition-colors">单选题 (10道)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-apple-primary focus:ring-apple-primary accent-apple-primary" />
                                <span className="font-medium group-hover:text-apple-primary transition-colors">多选题 (5道)</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer group">
                                <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-apple-primary focus:ring-apple-primary accent-apple-primary" />
                                <span className="font-medium group-hover:text-apple-primary transition-colors">简答/编程 (2道)</span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end items-center border-t border-gray-100">
                        <button onClick={() => setStatus('playing')} className="px-8 py-3 bg-apple-text text-white rounded-2xl font-bold hover:bg-black hover:scale-[1.02] transition-all shadow-md">
                            生成试卷并开始计时
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-fade-in-up h-[calc(100vh-80px)] flex flex-col max-w-5xl mx-auto">
            <header className="flex justify-between items-center mb-6 pl-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-1">前端混合测试 A卷</h1>
                    <p className="text-sm font-medium text-apple-subtext">单选 1/10</p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className={`text-xl md:text-2xl font-bold tracking-widest px-4 py-2 flex items-center justify-center rounded-2xl ${timeLeft < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-white shadow-sm text-apple-text border border-gray-100'}`} style={{ minWidth: '100px' }}>
                        {formatTime(timeLeft)}
                    </div>
                    <button onClick={() => setStatus('setup')} className="bg-[#f2f2f7] text-apple-text hover:bg-gray-200 px-6 py-3 rounded-2xl font-bold transition-colors shadow-sm">交卷</button>
                </div>
            </header>

            <div className="flex-1 glass-card p-8 md:p-12 mb-6 flex flex-col relative overflow-hidden">
                <span className="absolute top-4 left-6 text-8xl font-black text-gray-50 select-none -z-10">Q1</span>

                <div className="relative z-10 flex-1 flex flex-col">
                    <h2 className="text-xl md:text-2xl font-bold leading-relaxed mb-8 mt-4 text-apple-text">
                        在 React 18 中，关于 Automatic Batching (自动批处理) 说法<span className="text-apple-primary px-1 underline decoration-wavy underline-offset-4">不正确</span>的是？
                    </h2>

                    <div className="space-y-4">
                        {[
                            'A. 能够合并 Promise、setTimeout 内的多次状态更新',
                            'B. 它默认开启，不需要额外配置',
                            'C. 可以使用 flushSync 强制跳过批处理，立即更新 DOM',
                            'D. 只在 Concurrent Mode 下生效，且向下不兼容旧的代码'
                        ].map((opt, i) => (
                            <label key={i} className="flex items-center p-5 rounded-2xl border-2 border-[#f2f2f7] hover:border-apple-blue/50 hover:bg-apple-blue/5 cursor-pointer transition-all group">
                                <input type="radio" name="q1" className="w-5 h-5 mr-4 accent-apple-blue shadow-sm" />
                                <span className="font-medium text-lg leading-relaxed group-hover:text-apple-blue transition-colors">{opt}</span>
                            </label>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 flex justify-between items-center relative z-10">
                        <button className="text-apple-subtext font-bold hover:text-apple-text px-4 py-2 transition-colors">上一题</button>
                        <button className="bg-apple-blue text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-600 hover:shadow-apple-lg hover:-translate-y-0.5 transition-all shadow-md">下一题</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 4. Reply Prep Page
const ReplyPage = () => {
    const [style, setStyle] = useState('confident');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState('');

    const handleGenerate = () => {
        setIsGenerating(true);
        setResult('');
        setTimeout(() => {
            setResult("基于您的背景，这里提供一种高情商且凸显其实力的回答策略：\n\n1. 【先发制人】：坦诚承认技术栈差异，但强调底层逻辑的共通性。（例如：“确实我以 Vue 为主，但组件化思想、状态管理模型在 React 中是极其相似的。”）\n2. 【数据说话】：借机抛出你能快速学习的证据。（例如：“我曾在三天内掌握并重构了公司的历史 Angular 项目，我相信迁移到 React 的成本非常低。”）\n3. 【展现优势】：反向输出你的独特价值。（例如：“同时由于我深谙 Vue 响应式原理，在处理状态追踪和性能优化时，往往能提供不同视角的解决方案，或许能为 React 团队带来新的工程化思路。”）");
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="animate-fade-in-up max-w-6xl mx-auto flex flex-col h-[calc(100vh-60px)] md:h-[calc(100vh-100px)]">
            <header className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight mb-2">智能回复生成</h1>
                <p className="text-apple-subtext font-medium text-lg">输入难以回答的面试问题，选择人设，获取高情商高专业度的完美答复。</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
                {/* Left: Input config */}
                <div className="flex flex-col h-full">
                    <div className="glass-card p-8 flex-1 flex flex-col border border-gray-100/50">
                        <label className="text-lg font-bold flex items-center mb-4 text-apple-text">
                            <span className="text-apple-primary mr-2 text-xl">Q:</span> 面试官的棘手问题
                        </label>
                        <textarea
                            className="w-full bg-[#f2f2f7] rounded-3xl p-6 font-medium resize-none focus:outline-none focus:ring-2 focus:ring-apple-primary/30 text-apple-text placeholder-gray-400 border border-transparent focus:border-white shadow-inner"
                            placeholder="例如：你的技术栈主要在 Vue，但我们团队用 React，你如何胜任？"
                            rows="4"
                        ></textarea>

                        <div className="mt-8 mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-apple-text">简历背景预设</h3>
                            <button className="text-sm font-bold text-apple-blue hover:underline">编辑简历参数</button>
                        </div>
                        <div className="bg-[#fbfbfd] rounded-2xl p-4 text-sm font-medium text-apple-subtext mb-8 border border-gray-200/60 border-dashed">
                            💡 已自动应用背景参数：3年经验 / 注重系统架构 / 有大型B端重构经验
                        </div>

                        <h3 className="text-lg font-bold mb-4 text-apple-text">选择回答风格</h3>
                        <div className="bg-[#f2f2f7] p-1.5 rounded-2xl flex relative overflow-hidden text-sm font-bold shadow-inner">
                            {['academic', 'confident', 'pragmatic'].map((s) => (
                                <button
                                    key={s}
                                    onClick={() => setStyle(s)}
                                    className={`flex-1 py-3 rounded-xl z-10 transition-colors ${style === s ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    {s === 'academic' && '学术严谨 🎓'}
                                    {s === 'confident' && '活泼自信 ✨'}
                                    {s === 'pragmatic' && '沉稳务实 💼'}
                                </button>
                            ))}
                            <div
                                className="absolute top-1.5 bottom-1.5 w-[calc(33.33%-4px)] bg-white rounded-xl shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] z-0"
                                style={{ transform: `translateX(${style === 'academic' ? '0' : style === 'confident' ? '101%' : '202%'})` }}
                            ></div>
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className={`mt-auto w-full py-4 rounded-2xl font-bold flex justify-center items-center shadow-md transition-all ${isGenerating ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-apple-primary text-white hover:bg-apple-primaryHover hover:scale-[1.02] shadow-apple-lg shadow-apple-primary/20'
                                }`}
                        >
                            {isGenerating ? <Icons.Play className="w-5 h-5 animate-spin" /> : '一键生成完美回复'}
                        </button>
                    </div>
                </div>

                {/* Right: Output */}
                <div className="glass-card p-8 flex flex-col relative overflow-hidden group border border-gray-100/50">
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-blue-100 mt-10 to-purple-100 rounded-full blur-3xl opacity-60 z-0"></div>

                    <h3 className="text-xl font-bold mb-6 flex items-center z-10">
                        <span className="w-2 h-6 bg-apple-blue rounded-full mr-3 shadow-sm"></span>AI 参考答案
                    </h3>

                    <div className="flex-1 bg-white/60 backdrop-blur-md rounded-3xl p-6 z-10 overflow-y-auto border border-white/80 shadow-sm relative">
                        {isGenerating ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 opacity-80">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-apple-blue rounded-full animate-bounce shadow-sm"></div>
                                    <div className="w-3 h-3 bg-apple-blue rounded-full animate-bounce shadow-sm" style={{ animationDelay: "0.15s" }}></div>
                                    <div className="w-3 h-3 bg-apple-blue rounded-full animate-bounce shadow-sm" style={{ animationDelay: "0.3s" }}></div>
                                </div>
                                <p className="font-bold text-sm text-apple-blue tracking-wider animate-pulse">正在深度分析问题意图...</p>
                            </div>
                        ) : result ? (
                            <div className="prose prose-p:leading-loose prose-p:font-medium text-apple-text animate-fade-in-up">
                                {result.split('\n').map((line, i) => (
                                    <p key={i} className={`mb-3 ${line.includes('【') ? 'font-bold text-black border-l-2 border-apple-primary pl-3' : 'text-gray-700'}`}>{line}</p>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <p className="font-medium text-apple-subtext bg-gray-50/50 px-6 py-3 rounded-full border border-gray-100">等待问题输入...</p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 flex space-x-4 z-10">
                        <button disabled={!result} className="flex-1 py-3.5 bg-[#fbfbfd] disabled:opacity-50 text-apple-text rounded-2xl font-bold hover:bg-gray-100 transition-colors border border-gray-200 shadow-sm hover:shadow-md">一键复制</button>
                        <button disabled={!result} className="flex-1 py-3.5 bg-apple-text disabled:opacity-50 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5" onClick={handleGenerate}>再生成一个</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. Record Page
const RecordPage = () => {
    // Mock chart data
    const data = [
        { name: '10/1', rate: 65 },
        { name: '10/5', rate: 70 },
        { name: '10/10', rate: 68 },
        { name: '10/15', rate: 78 },
        { name: '10/20', rate: 82 },
        { name: '10/25', rate: 88 },
        { name: '10/30', rate: 85 },
    ];

    return (
        <div className="animate-fade-in-up space-y-8 max-w-6xl mx-auto">
            <header className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">训练记录</h1>
                    <p className="text-apple-subtext font-medium text-lg">追踪您的成长轨迹，温故而知新。</p>
                </div>
                <div className="flex space-x-2 bg-[#f2f2f7] p-1 rounded-2xl">
                    <button className="px-5 py-2 rounded-xl bg-white shadow-sm font-bold text-sm">全部</button>
                    <button className="px-5 py-2 rounded-xl text-apple-subtext font-bold text-sm hover:text-apple-text">面试</button>
                    <button className="px-5 py-2 rounded-xl text-apple-subtext font-bold text-sm hover:text-apple-text">笔试</button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Area */}
                <div className="lg:col-span-2 glass-card p-8 flex flex-col h-96">
                    <h3 className="text-xl font-bold mb-6">正确率趋势</h3>
                    <div className="flex-1 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E5EA" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8E8E93', fontSize: 12, fontWeight: 600 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8E8E93', fontSize: 12, fontWeight: 600 }} dx={-10} domain={[0, 100]} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.95)' }}
                                    itemStyle={{ color: '#0066cc', fontWeight: 'bold' }}
                                />
                                <Line type="monotone" dataKey="rate" stroke="#0066cc" strokeWidth={4} dot={{ r: 4, fill: '#0066cc', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} animationDuration={1500} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Filter / Stats */}
                <div className="space-y-6 flex flex-col">
                    <div className="glass-card p-6 flex items-center justify-between group cursor-pointer hover:bg-apple-primary hover:text-white transition-colors">
                        <div>
                            <h3 className="font-bold text-lg group-hover:text-white transition-colors">错题本</h3>
                            <p className="text-apple-subtext group-hover:text-red-100 transition-colors text-sm mt-1">待复习 24 题</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-red-50 text-apple-primary flex items-center justify-center group-hover:bg-white transition-colors">
                            <Icons.Play className="w-6 h-6 text-apple-primary" />
                        </div>
                    </div>

                    <div className="glass-card p-6 flex items-center justify-between group cursor-pointer hover:bg-apple-blue hover:text-white transition-colors">
                        <div>
                            <h3 className="font-bold text-lg group-hover:text-white transition-colors">收藏夹</h3>
                            <p className="text-apple-subtext group-hover:text-blue-100 transition-colors text-sm mt-1">已收藏 156 题</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-apple-blue flex items-center justify-center group-hover:bg-white transition-colors">
                            <span className="font-black text-xl text-apple-blue">★</span>
                        </div>
                    </div>

                    <div className="glass-card p-6 flex-1 relative overflow-hidden flex flex-col justify-center border border-gray-100/50">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-bl-full opacity-50"></div>
                        <h3 className="text-apple-subtext font-medium text-sm z-10 block relative whitespace-nowrap overflow-visible">最强能力项</h3>
                        <p className="text-3xl font-bold mt-1 z-10 text-apple-text tracking-tight relative break-words whitespace-normal break-all">前端工程化</p>
                        <p className="text-sm font-bold text-apple-green mt-2 z-10 relative">超越 92% 用户</p>
                    </div>
                </div>
            </div>

            {/* List Array */}
            <div className="pt-4">
                <h3 className="text-2xl font-bold tracking-tight mb-6">历史训练</h3>
                <div className="glass-card overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-[#fbfbfd] border-b border-gray-100">
                            <tr>
                                <th className="px-6 py-4 text-xs tracking-wider text-apple-subtext uppercase font-bold">时间</th>
                                <th className="px-6 py-4 text-xs tracking-wider text-apple-subtext uppercase font-bold">类型</th>
                                <th className="px-6 py-4 text-xs tracking-wider text-apple-subtext uppercase font-bold">标签</th>
                                <th className="px-6 py-4 text-xs tracking-wider text-apple-subtext uppercase font-bold">得分/正确率</th>
                                <th className="px-6 py-4 text-xs tracking-wider text-apple-subtext uppercase font-bold text-right">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 font-medium">
                            {[
                                { date: '今天 14:30', type: '面试', tags: ['前端', '中等'], score: '85/100', color: 'blue' },
                                { date: '昨天 09:15', type: '笔试', tags: ['React', '混合'], score: '92%', color: 'primary' },
                                { date: '10月28日', type: '笔试', tags: ['计算机网络'], score: '78%', color: 'green' },
                                { date: '10月25日', type: '智能回复', tags: ['行为面'], score: '已生成', color: 'gray' },
                            ].map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-5 whitespace-nowrap text-apple-text">{row.date}</td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`px-3 py-1 bg-${row.color === 'blue' ? 'blue-50' : row.color === 'primary' ? 'red-50' : row.color === 'gray' ? 'gray-100' : 'green-50'} text-${row.color === 'blue' ? 'apple-blue' : row.color === 'primary' ? 'apple-primary' : row.color === 'gray' ? 'apple-subtext' : 'apple-green'} rounded-full text-xs font-bold`}>
                                            {row.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-apple-subtext text-sm">
                                        {row.tags.join(', ')}
                                    </td>
                                    <td className="px-6 py-5 font-bold text-apple-text">{row.score}</td>
                                    <td className="px-6 py-5 text-right">
                                        <Link to={row.type === '智能回复' ? "/reply" : "/result"} className="text-apple-blue font-bold hover:underline text-sm">查看报告</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// 6. Question Detail Page
const QuestionDetailPage = () => {
    const { id } = window.ReactRouterDOM.useParams();
    const [saved, setSaved] = useState(false);

    return (
        <div className="animate-fade-in-up max-w-4xl mx-auto space-y-8 pb-10">
            <header className="flex items-center space-x-4 mb-4">
                <Link to="/record" className="w-10 h-10 bg-[#f2f2f7] rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-apple-text">
                    <span className="font-bold text-lg leading-none mt-[-2px]">←</span>
                </Link>
                <div className="flex-1">
                    <p className="text-apple-subtext font-bold text-xs uppercase tracking-wider mb-1">试题库 / 高频前端面试题</p>
                    <h1 className="text-3xl font-bold tracking-tight">题目详情 #{id || '1024'}</h1>
                </div>
            </header>

            <div className="glass-card p-8 md:p-12 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                    <div className="space-x-2 flex items-center">
                        <span className="px-3 py-1 bg-red-50 text-apple-primary rounded-lg text-xs font-bold shadow-sm">困难</span>
                        <span className="px-3 py-1 bg-[#f2f2f7] text-apple-subtext rounded-lg text-xs font-bold">React</span>
                        <span className="px-3 py-1 bg-[#f2f2f7] text-apple-subtext rounded-lg text-xs font-bold">Hooks</span>
                    </div>
                    <button
                        onClick={() => setSaved(!saved)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-sm ${saved ? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100' : 'bg-[#f2f2f7] text-gray-400 hover:bg-gray-200'}`}
                        title={saved ? '取消收藏' : '加入收藏'}
                    >
                        <span className="text-2xl font-black mb-1">{saved ? '★' : '☆'}</span>
                    </button>
                </div>

                <h2 className="text-2xl font-bold leading-relaxed mb-6 text-apple-text">
                    请详细解释 React 中 `useEffect` 和 `useLayoutEffect` 的执行时机差异，以及在什么场景下必须使用 `useLayoutEffect`？
                </h2>

                <div className="border-t border-gray-100 pt-8 mt-4">
                    <h3 className="text-xl font-bold flex items-center mb-6"><span className="w-2 h-6 bg-apple-green rounded-full mr-3"></span>详细解析</h3>

                    <div className="space-y-6 text-apple-text">
                        <div className="bg-[#fbfbfd] p-6 rounded-3xl border border-gray-100/60">
                            <h4 className="font-bold text-lg mb-3">1. 执行时机差异</h4>
                            <p className="leading-relaxed font-medium text-gray-700">
                                <code>useEffect</code> 是异步执行的，它会在浏览器完成布局（Layout）和绘制（Paint）之后，在一个延迟事件中被调用。这样设计主要是为了不阻塞浏览器的渲染进程。
                            </p>
                            <p className="leading-relaxed font-medium text-gray-700 mt-2">
                                <code>useLayoutEffect</code> 是同步执行的。它会在所有的 DOM 变更发生之后、但在浏览器进行任何真正绘制到屏幕上之前被调用。你可以把它看作是能在浏览器呈现新画面前“拦截”修改的最后机会。
                            </p>
                        </div>
                        <div className="bg-[#fbfbfd] p-6 rounded-3xl border border-gray-100/60">
                            <h4 className="font-bold text-lg mb-3">2. 适用场景</h4>
                            <p className="leading-relaxed font-medium text-gray-700">
                                绝大多数业务请求、事件监听等情况应该首选 <code>useEffect</code> 以保持渲染性能和顺畅度。
                            </p>
                            <p className="leading-relaxed font-medium mt-3 border-l-4 border-apple-primary pl-4 bg-apple-primary/5 py-2 rounded-r-xl">
                                只有当你需要<strong>读取 DOM 元素的布局信息（如尺寸宽高等、节点位置）并根据这些信息同步地去重新渲染时</strong>，才是必须使用 <code>useLayoutEffect</code> 的场景。
                            </p>
                            <p className="leading-relaxed font-medium text-gray-700 mt-3">
                                如果在 <code>useEffect</code> 中做这些操作，用户可能会看到明显的视觉闪烁（Flicker），因为浏览器先绘制了初始状态，随后你的 effect 读取位置更改了 state，又触发了第二次闪动绘制。
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 关联推荐 */}
            <div className="pt-4">
                <h3 className="text-2xl font-bold tracking-tight mb-6">关联推荐</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { title: '深入理解 Fiber 架构的时间分片', type: '原理剖析' },
                        { title: 'React 18 Concurrent Mode 核心机制', type: '底层逻辑' }
                    ].map((item, i) => (
                        <div key={i} className="glass-card p-6 cursor-pointer hover:bg-black group transition-colors flex justify-between items-center border border-gray-100/50 hover:border-black shadow-sm">
                            <div>
                                <p className="text-xs font-bold text-apple-subtext group-hover:text-gray-400 mb-2 uppercase tracking-tight">{item.type}</p>
                                <h4 className="text-lg font-bold text-apple-text group-hover:text-white transition-colors">{item.title}</h4>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#f2f2f7] group-hover:bg-white/20 flex items-center justify-center text-apple-text group-hover:text-white transition-colors">
                                <span className="font-bold text-lg mt-[-2px]">→</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
// 7. Profile Page
const ProfilePage = () => {
    const [resume, setResume] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setResult({
                intro3m: "面试官好，我是[姓名]，毕业于[院校]。过去三年我专注于前端工程化和系统优化。在上一家公司，我主导了核心业务从 Vue 到 React 的重构，通过引入微前端架构和细粒度状态管理，将首屏加载时间缩短了 40%，且提升了团队协作开发效率。我非常看重代码的可维护性和团队的基础设施建设，这也是我对贵部门前端岗位非常感兴趣的原因。",
                intro5m: "各位面试官好，我是[姓名]。\n\n【教育与背景】我毕业于[院校]计算机专业，拥有三年扎实的前端开发经验。\n\n【深耕技术与业务闭环】在上一家公司，我不仅承担了核心 C 端网页的性能调优，还主导搭建了基于 React + TypeScript 的企业级组件库。通过制定严格的 Lint 规则和自动化测试，将整个团队的线上 Bug 率降低了 30%。我印象最深的一个项目是，在一次业务大促中，利用 React 的并发特性和懒加载，在极端流量下保证了首页的顺畅交互。\n\n【为什么选择这里】我了解到贵团队非常重视用户体验和技术深度，这与我的技术追求不谋而合。我希望能在贵团队贡献自己在大规模系统架构上的经验，同时在复杂业务场景中进一步提升自己的技术心智。",
                pptDesign: "🔹 风格建议：极简科技风，致敬 Apple 设计语言，运用大面积留白与毛玻璃叠加效果。\n🔹 配色方案：深邃宇宙黑/深空灰背景，配合高饱和度荧光蓝或亮紫渐变高亮重点数据。\n🔹 排版特色：第一页仅用特大加粗无衬线字体展示核心金句；避免长篇大论，用大号数字展示业务成果。\n🔹 动画设置：使用柔和的缩放(Scale)和淡入(Fade-in)过渡，避免眼花缭乱的飞入，展现沉稳专业。"
            });
            setIsGenerating(false);
        }, 2000);
    };

    return (
        <div className="animate-fade-in-up max-w-6xl mx-auto flex flex-col h-[calc(100vh-60px)] md:h-[calc(100vh-100px)]">
            <header className="mb-8 pl-1">
                <h1 className="text-4xl font-bold tracking-tight mb-2">个人背景解析</h1>
                <p className="text-apple-subtext font-medium text-lg">解析简历并为您一键生成多版本自我介绍与专属面试 PPT 灵感方案。</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
                {/* Left: Input */}
                <div className="glass-card p-8 flex flex-col border border-gray-100/50 shadow-sm relative group overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-apple-blue/5 rounded-bl-full transition-transform group-hover:scale-110"></div>
                    <h3 className="text-xl font-bold mb-6 flex items-center text-apple-text z-10">
                        <span className="w-8 h-8 rounded-full bg-apple-blue/10 text-apple-blue flex items-center justify-center mr-3 text-sm shadow-sm">1</span>
                        输入或粘贴简历内容
                    </h3>
                    <textarea
                        className="w-full flex-1 min-h-[250px] md:min-h-0 z-10 bg-[#f2f2f7] rounded-3xl p-6 font-medium leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-apple-primary/30 text-apple-text placeholder-gray-400 border border-transparent focus:bg-white shadow-inner transition-colors mb-6"
                        placeholder="在此粘贴您的简历文本或过往经历概述..."
                        value={resume}
                        onChange={(e) => setResume(e.target.value)}
                    ></textarea>

                    <button
                        onClick={handleGenerate}
                        disabled={!resume || isGenerating}
                        className={`w-full py-4 rounded-2xl font-bold flex justify-center items-center shadow-md transition-all z-10 ${!resume || isGenerating ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-apple-primary text-white hover:bg-black hover:scale-[1.02] shadow-apple hover:shadow-apple-lg'
                            }`}
                    >
                        {isGenerating ? <Icons.Play className="w-5 h-5 animate-spin" /> : '提取核心亮点并生成素材'}
                    </button>
                </div>

                {/* Right: Output */}
                <div className="glass-card p-8 flex flex-col relative overflow-hidden overflow-y-auto border border-gray-100/50 border-t-[1px]">
                    <h3 className="text-xl font-bold mb-6 flex items-center z-10 text-apple-text">
                        <span className="w-8 h-8 rounded-full bg-apple-green/10 text-apple-green flex items-center justify-center mr-3 text-sm shadow-sm">2</span>
                        定制化面试物料
                    </h3>

                    {isGenerating && (
                        <div className="flex-1 flex flex-col items-center justify-center opacity-80 z-10">
                            <div className="flex space-x-2 mb-4">
                                <div className="w-3 h-3 bg-apple-blue rounded-full animate-bounce shadow-sm"></div>
                                <div className="w-3 h-3 bg-apple-primary rounded-full animate-bounce shadow-sm" style={{ animationDelay: "0.15s" }}></div>
                                <div className="w-3 h-3 bg-apple-green rounded-full animate-bounce shadow-sm" style={{ animationDelay: "0.3s" }}></div>
                            </div>
                            <p className="font-bold text-sm text-gray-500 tracking-wider">正在深度挖掘亮点并匹配风格...</p>
                        </div>
                    )}

                    {!isGenerating && result && (
                        <div className="space-y-8 animate-fade-in-up pb-8 z-10">
                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-lg text-apple-text flex items-center">
                                        ⏱ 3 分钟自我介绍 (精华版)
                                    </h4>
                                    <button className="text-xs font-bold text-white bg-black px-4 py-1.5 rounded-full hover:bg-gray-800 shadow-sm transition-colors">复制</button>
                                </div>
                                <div className="bg-[#fbfbfd] p-6 rounded-3xl border border-gray-100 leading-relaxed font-medium text-gray-700 text-sm shadow-sm hover:shadow-md transition-shadow">
                                    {result.intro3m}
                                </div>
                            </section>

                            <section>
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="font-bold text-lg text-apple-text flex items-center">
                                        ⏱ 5 分钟自我介绍 (详尽版)
                                    </h4>
                                    <button className="text-xs font-bold text-white bg-black px-4 py-1.5 rounded-full hover:bg-gray-800 shadow-sm transition-colors">复制</button>
                                </div>
                                <div className="bg-[#fbfbfd] p-6 rounded-3xl border border-gray-100 font-medium text-gray-700 text-sm shadow-sm hover:shadow-md transition-shadow">
                                    {result.intro5m.split('\n').map((para, i) => (
                                        <p key={i} className={`mb-3 ${para.includes('【') ? 'font-bold text-black border-l-2 border-apple-primary pl-3 bg-gradient-to-r from-red-50 to-transparent py-1' : ''} leading-relaxed`}>{para}</p>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h4 className="font-bold text-lg text-apple-text mb-4">🎨 专属面试 PPT 设计建议</h4>
                                <div className="bg-gradient-to-br from-gray-900 via-[#1d1d1f] to-[#121212] p-6 rounded-3xl text-gray-200 text-sm font-medium leading-relaxed shadow-apple-lg border border-gray-800 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                                    <div className="relative z-10">
                                        {result.pptDesign.split('\n').map((line, i) => (
                                            <p key={i} className="mb-3 text-gray-300"><span className="text-white mr-1">{line.charAt(0)}</span>{line.substring(1)}</p>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        </div>
                    )}

                    {!isGenerating && !result && (
                        <div className="flex-1 flex items-center justify-center z-10">
                            <p className="font-medium text-apple-subtext bg-[#f2f2f7] px-6 py-3 rounded-2xl shadow-sm text-sm border border-gray-100 border-dashed">等待解析简历内容...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 8. Result Page
const ResultPage = () => {
    // Radar Chart Data representing Skills
    const radarData = [
        { subject: '基础概念', A: 90, fullMark: 100 },
        { subject: '源码原理', A: 65, fullMark: 100 },
        { subject: '工程化', A: 85, fullMark: 100 },
        { subject: '性能优化', A: 75, fullMark: 100 },
        { subject: '系统设计', A: 55, fullMark: 100 },
        { subject: '算法与逻辑', A: 80, fullMark: 100 },
    ];

    return (
        <div className="animate-fade-in-up space-y-8 max-w-6xl mx-auto pb-10">
            <header className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">训练评估分析</h1>
                    <p className="text-apple-subtext font-medium text-lg">基于 2023-10-25 "前端资深开发" 题库的实战结果</p>
                </div>
                <button className="px-6 py-3 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 hover:scale-105 transition-all shadow-apple flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    <span>保存为 PDF</span>
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score and Summary Card */}
                <div className="glass-card p-10 flex flex-col items-center justify-center border border-gray-100/50 relative overflow-hidden group shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#f2f2f7] to-transparent z-0"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <p className="font-bold text-apple-subtext uppercase tracking-widest text-sm mb-6">综合评定得分</p>
                        <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                                <circle cx="96" cy="96" r="88" stroke="#E5E5EA" strokeWidth="12" fill="none" />
                                <circle cx="96" cy="96" r="88" stroke="url(#blueGradient)" strokeWidth="12" fill="none" strokeDasharray="553" strokeDashoffset="99" strokeLinecap="round" className="transition-all duration-[2000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]" />
                                <defs>
                                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#0066cc" />
                                        <stop offset="100%" stopColor="#00aaff" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <div className="text-center">
                                <span className="text-6xl font-black text-apple-text tracking-tighter">82</span>
                                <span className="text-2xl font-bold text-apple-subtext ml-1">/100</span>
                            </div>
                        </div>
                        <span className="px-5 py-2 bg-gradient-to-r from-[#0066cc] to-[#00aaff] text-white rounded-full text-sm font-bold shadow-md tracking-wider">超越了 68% 的同层级候选人</span>
                    </div>
                </div>

                {/* Radar Chart Card */}
                <div className="col-span-1 lg:col-span-2 glass-card p-8 border border-gray-100/50 shadow-sm flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-bl-[100px]"></div>
                    <h3 className="text-2xl font-bold mb-2">架构师潜能雷达</h3>
                    <p className="text-sm font-medium text-apple-subtext mb-2">您在工程化和基础知识方面表现极佳，但系统设计与底层源码是突破上限的关键。</p>
                    <div className="w-full flex-1 min-h-[250px] md:min-h-0 relative z-10 -ml-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#E5E5EA" strokeDasharray="3 3" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#1d1d1f', fontSize: 13, fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="本次得分测评" dataKey="A" stroke="#fa243c" strokeWidth={3} fill="#fa243c" fillOpacity={0.15} isAnimationActive={true} animationDuration={1800} />
                                <Tooltip contentStyle={{ borderRadius: '1.2rem', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', background: 'rgba(255,255,255,0.9)' }} itemStyle={{ fontWeight: '900', color: '#fa243c' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Suggestions & Review */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Text Suggestion */}
                <div className="glass-card p-10 border border-gray-100/50 shadow-sm">
                    <h3 className="text-2xl font-bold mb-8 flex items-center text-apple-text tracking-tight">
                        <span className="w-10 h-10 rounded-full bg-apple-primary/10 text-apple-primary flex items-center justify-center mr-3 font-bold text-xl">!</span>
                        AI 深度改进方案
                    </h3>
                    <div className="space-y-6">
                        <div className="p-6 bg-[#fbfbfd] rounded-3xl border border-red-100/50 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-apple-primary"></div>
                            <h4 className="font-bold text-apple-primary mb-3 text-lg">攻克底层原理瓶颈</h4>
                            <p className="text-sm font-medium text-gray-700 leading-relaxed text-justify">
                                建议详细梳理 React Fiber 的时间分片算法以及 Vue 双向绑定的依赖收集源码。\n面对大厂面试官极易被深度追问这些具体实现，您的阐述现阶段显得较为平面。
                            </p>
                        </div>
                        <div className="p-6 bg-[#fbfbfd] rounded-3xl border border-blue-100/50 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-apple-blue"></div>
                            <h4 className="font-bold text-apple-blue mb-3 text-lg">系统设计的立体视角</h4>
                            <p className="text-sm font-medium text-gray-700 leading-relaxed text-justify">
                                对于百万级数据渲染问题，您仅提到了“虚拟列表”。在高级面试中，应该补充对动态节点高度、滚动防抖、资源预加载甚至 WebWorker 分担主线程的综合考量。
                            </p>
                        </div>
                        <div className="p-6 bg-[#f2f2f7] rounded-3xl border border-gray-200/50 relative overflow-hidden">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-apple-text"></div>
                            <h4 className="font-bold text-apple-text mb-3 text-lg">保持优势与复盘策略</h4>
                            <p className="text-sm font-medium text-gray-700 leading-relaxed text-justify">
                                您对工程化工具链的回答具有很高实践价值。面试表达依然自信有逻辑！未来可以多使用 <strong>STAR 法则</strong>对项目挑战点进行包装。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Questions Review */}
                <div className="glass-card p-10 border border-gray-100/50 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-2xl font-bold tracking-tight">实战考点逐一复盘</h3>
                        <span className="text-sm font-bold text-white bg-apple-primary px-4 py-1.5 rounded-full cursor-pointer hover:bg-apple-primaryHover transition-all shadow-md">加入错题本 (2)</span>
                    </div>

                    <div className="space-y-4 flex-1">
                        {[
                            { q: '简述 Webpack 的构建流程与各类核心插件运行机制', status: 'perfect' },
                            { q: 'React 中针对并发状态和外部系统同步，有哪些好的防抖节流实践？', status: 'good' },
                            { q: '从输入 URL 到页面渲染完成，中间 TCP 通信和渲染树融合发生了什么？', status: 'bad' },
                            { q: '请手撕：利用 EventLoop 原理实现一个真正的 Promise.all 并支持并发限制', status: 'bad' }
                        ].map((item, i) => (
                            <Link to={`/question/${i + 1}`} key={i} className="p-5 rounded-3xl border border-gray-100 hover:border-gray-300 hover:shadow-apple bg-white transition-all cursor-pointer flex justify-between items-center group relative overflow-hidden">
                                <p className="font-extrabold text-[15px] text-gray-800 group-hover:text-apple-blue leading-relaxed pr-6 z-10 transition-colors">
                                    <span className="text-gray-400 mr-2">{i + 1}.</span>
                                    {item.q}
                                </p>
                                <div className={`flex items-center justify-center p-2 rounded-xl text-white font-bold text-xs uppercase z-10 ${item.status === 'perfect' ? 'bg-apple-green text-[#000]' : item.status === 'good' ? 'bg-yellow-400 text-black' : 'bg-apple-primary'}`}>
                                    {item.status === 'perfect' ? 'A+' : item.status === 'good' ? 'B' : '瑕疵'}
                                </div>
                            </Link>
                        ))}
                    </div>
                    <button className="w-full mt-6 py-4 bg-[#f2f2f7] text-black font-bold text-lg rounded-2xl hover:bg-gray-200 transition-colors tracking-wide">
                        查看完整面经报告分析 →
                    </button>
                </div>
            </div>
        </div>
    );
};

// ------------- APP -------------
const App = () => {
    return (
        <HashRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/interview" element={<InterviewPage />} />
                    <Route path="/written" element={<WrittenPage />} />
                    <Route path="/reply" element={<ReplyPage />} />
                    <Route path="/record" element={<RecordPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/question/:id" element={<QuestionDetailPage />} />
                    <Route path="/result" element={<ResultPage />} />
                </Routes>
            </Layout>
        </HashRouter>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
