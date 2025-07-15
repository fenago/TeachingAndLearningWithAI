'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Users, Award, Briefcase } from 'lucide-react';

export default function AboutAuthorPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Background decoration with parallax */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 to-blue-100/20 dark:from-purple-900/10 dark:to-blue-900/10" />
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10">
        <div className="container max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">

          {/* Hero Section with Photo and Main Headline */}
          <motion.div 
            className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 mb-16"
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
          >
            {/* Professional Photo */}
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="w-[200px] h-[200px] lg:w-[300px] lg:h-[300px] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full p-1">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmiro.medium.com%2Fv2%2Fresize%3Afit%3A2400%2F1*nzdYUSs4c2RQs2W0FCHv1g.jpeg&f=1&nofb=1&ipt=1dfd20c4ad3ffae3ee11dbcc3096d77975923464b0489249a7be66b332f47f93"
                    alt="Dr. Ernesto Lee - AI Education Expert and Author"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.1)]" />
              </div>
            </motion.div>

            {/* Main Headline and Intro */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Meet Dr. Ernesto Lee - Your Guide to AI Education Excellence
              </h1>
              <h2 className="text-xl lg:text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
                Transforming Education Through AI Innovation
              </h2>
              {/* Two-column table-like layout for credentials and book */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/30 dark:bg-gray-800/30 rounded-xl p-4 shadow-sm">
                {/* Left column with professional info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium">Assistant Professor, Computer Science & Data Analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium">15+ Years of AI Education Research</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium"><span className="text-purple-600 dark:text-purple-400">1,607+</span> Google Scholar Citations</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="font-medium"><span className="text-purple-600 dark:text-purple-400">37+</span> Peer-Reviewed Publications</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <div className="flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-purple-600 dark:text-purple-400">
                        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
                      </svg>
                    </div>
                    <span className="font-medium"><span className="text-purple-600 dark:text-purple-400">5+</span> Published Books</span>
                  </div>
                </div>
                
                {/* Right column with book image */}
                <div className="flex justify-center md:justify-end items-center">
                  <div className="relative w-40 md:w-48">
                    <div className="bg-gradient-to-br from-white/60 to-purple-50/60 dark:from-gray-800/60 dark:to-purple-900/60 p-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm">
                      <img 
                        src="/mock-00001a-.png" 
                        alt="Productive Struggle Book" 
                        className="w-full h-auto rounded-sm" 
                        style={{ mixBlendMode: 'multiply' }}
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl -z-10"></div>
                    <div className="absolute -top-2 -left-2 w-10 h-10 bg-blue-500/10 rounded-full blur-lg -z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Professional Bio Section */}
          <motion.section 
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Dr. Ernesto Lee stands at the forefront of the AI education revolution as an Assistant Professor of Computer Science and Data Analytics at Miami Dade College's School of Engineering and Technology. With over 30 years of combined industry and academic experience, Dr. Lee has dedicated his career to bridging the gap between cutting-edge artificial intelligence technology and meaningful educational transformation.
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                What sets Dr. Lee apart is his unique understanding that AI's greatest gift to education isn't making learning easier—it's making learning deeper.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                As a pioneer in "Emotionally Intelligent AI" integration, he has developed groundbreaking approaches that enhance student engagement while preserving the productive struggle essential for genuine learning.
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Dr. Lee's educational philosophy centers on creating inclusive, stimulating environments where all students can thrive. His innovative teaching methods have earned recognition from colleagues and students alike, with his courses consistently achieving high satisfaction scores while maintaining rigorous academic standards.
              </p>
            </div>
            
            {/* Key Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Role</div>
                <div className="font-semibold text-gray-900 dark:text-white">Assistant Professor</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Institution</div>
                <div className="font-semibold text-gray-900 dark:text-white">Miami Dade College</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Specializations</div>
                <div className="font-semibold text-gray-900 dark:text-white">AI, ML, Data Analytics</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <div className="text-sm text-gray-600 dark:text-gray-400">Teaching Philosophy</div>
                <div className="font-semibold text-gray-900 dark:text-white">Amplify, Don't Replace</div>
              </div>
            </div>
          </motion.section>

          {/* Research Credentials Section */}
          <motion.section 
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Research Excellence & Academic Impact
            </h3>
            
            {/* Research Metrics with Counter Animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">1,607+</div>
                <div className="text-gray-700 dark:text-gray-300">Google Scholar Citations</div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">37+</div>
                <div className="text-gray-700 dark:text-gray-300">Peer-Reviewed Publications</div>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-xl"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                <div className="text-gray-700 dark:text-gray-300">Published Books</div>
              </motion.div>
            </div>

            {/* Key Publications */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Published Books</h4>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                  <span><em>Natural Language Processing with GPT</em> (Latest release)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                  <span><em>Data Analytics with Python</em></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                  <span><em>Apache Spark</em> (Cloud Computing, Big Data Series)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                  <span><em>Apache Kafka</em> (Cloud Computing, Big Data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                  <span><em>R Programming for Data Scientists and Analysts</em></span>
                </li>
              </ul>
            </div>
          </motion.section>

          {/* Speaking Engagements & Recognition */}
          <motion.section 
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Thought Leadership & Industry Recognition
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Speaking Highlights */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Speaking Highlights</h4>
                <div className="space-y-3">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <div className="font-semibold text-purple-600 dark:text-purple-400">ASU+GSV Summit 2025</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Featured Speaker on Emotionally Intelligent AI</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                    <div className="font-semibold text-purple-600 dark:text-purple-400">CBS Miami</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">AI's Rapid Rise: Preparing the Next Generation</div>
                  </div>
                </div>
              </div>
              
              {/* Professional Recognition */}
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Professional Recognition</h4>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Co-Principal Investigator, NSF Grant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Miami Dade College Faculty Excellence</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Industry Partnerships Leader</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Educational AI Consultant</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.section>

          {/* Personal Story Section */}
          <motion.section 
            className="mb-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-8 lg:p-12 rounded-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-6">
              The Crisis That Sparked a Revolution
            </h3>
            
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                The moment that changed everything happened at 2:47 AM on a Tuesday night in my home office.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I was grading my Data Analytics students' midterm exams when I discovered something that shook me to my core. Despite months of AI-assisted homework with perfect completion rates, my students had performed worse than any class I'd taught in fifteen years. The same students who had been confidently solving complex problems with AI assistance couldn't handle basic concepts without technological support.
              </p>
              
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                I realized I had created exactly what I was trying to prevent: students who were dependent on getting answers rather than developing the thinking skills necessary to generate answers themselves.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                That night, surrounded by disappointing exam papers, I had a revelation that would reshape my entire approach to AI in education. <strong>The problem wasn't that AI was too powerful—it was that we were using it completely wrong.</strong> We were optimizing for efficiency and correct answers when we should have been optimizing for learning and intellectual growth.
              </p>
              
              <p className="text-xl font-bold text-purple-600 dark:text-purple-400 my-6">
                This crisis became my calling.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Over the next two years, I embarked on a research journey that would fundamentally challenge everything the education world believed about AI. I discovered that the most effective educational AI isn't the one that makes learning easier—it's the one that makes learning deeper. Sometimes the most important feature is knowing when NOT to help, and instead guide students to help themselves.
              </p>
              
              <p className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                I wrote "Productive Struggle" because I realized that thousands of brilliant educators were making the same mistakes I had made.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                This book represents 15+ years of research, 30+ years of teaching experience, and the hard-won wisdom that comes from failing forward. Every chapter addresses a specific way that educators use AI wrong, and more importantly, shows exactly how to use it right.
              </p>
              
              <p className="text-lg text-gray-900 dark:text-white font-semibold mb-4">
                My mission is simple: To ensure that no educator has to experience that 2:47 AM moment of realizing they've accidentally undermined the very learning they're trying to promote. AI should make our students think harder, not less. It should amplify human intelligence, not replace it.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300">
                The future of education isn't about choosing between human wisdom and artificial intelligence—it's about combining them to create learning experiences more powerful than either could achieve alone. That's why I wrote this book. That's why this work matters. And that's why I believe every educator deserves to discover the transformative power of productive struggle in an AI-enhanced world.
              </p>
            </div>
          </motion.section>

          {/* Educational Background */}
          <motion.section 
            className="mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Academic Foundation
            </h3>
            
            <div className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-lg text-gray-900 dark:text-white">Doctorate in Business Administration</div>
                <div className="text-gray-600 dark:text-gray-400">Concentration in Data Science and Analytics</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">Baker College</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-lg text-gray-900 dark:text-white">Master of Science, Systems Engineering</div>
                <div className="text-gray-600 dark:text-gray-400">Concentration in Software Engineering</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">Virginia Tech</div>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <div className="font-semibold text-lg text-gray-900 dark:text-white">Bachelor of Science, Physics</div>
                <div className="text-sm text-gray-500 dark:text-gray-500">Old Dominion University</div>
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section 
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInVariants}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to transform your teaching with Dr. Lee's proven methodology?
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get the Book Now
                <ArrowRight className="inline-block ml-2 w-5 h-5" />
              </motion.button>
              
              <motion.button
                className="px-8 py-4 border-2 border-purple-600 text-purple-600 dark:text-purple-400 font-semibold rounded-full hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Chapter 1 Free
              </motion.button>
            </div>
            
            {/* Book Visual at bottom */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative max-w-lg">
                <img 
                  src="/mock-00285-.png" 
                  alt="Productive Struggle Book Impact" 
                  className="w-full h-auto rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300" 
                />
                <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -top-6 -left-6 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl -z-10"></div>
              </div>
            </motion.div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}
