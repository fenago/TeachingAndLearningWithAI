"use client";

import { useRef, useState } from "react";
import type { JSX } from "react";

// <FAQ> component is a lsit of <Item> component
// Just import the FAQ & add your FAQ content to the const faqList arrayy below.

interface FAQItemProps {
  question: string;
  answer: JSX.Element;
}

const faqList: FAQItemProps[] = [
  {
    question: "What is productive struggle methodology?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          Productive struggle is a research-based educational approach that recognizes cognitive effort 
          as essential for meaningful learning. Rather than eliminating challenges, it strategically 
          uses AI tools to enhance learning while preserving the mental work students need to develop 
          deep understanding and critical thinking skills.
        </p>
      </div>
    ),
  },
  {
    question: "How is this different from other AI education approaches?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          Most AI education tools focus on making learning easier or faster. Our approach recognizes 
          that some difficulty is necessary for learning. We teach educators how to use AI as a 
          thinking partner rather than a replacement for student thinking, maintaining the productive 
          friction that leads to genuine understanding.
        </p>
      </div>
    ),
  },
  {
    question: "Is this suitable for K-12 teachers or just college faculty?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          Our methodology works for both K-12 and college educators. The principles of productive 
          struggle apply across all educational levels, though implementation strategies may vary. 
          Our workshops and resources provide specific examples and techniques tailored to different 
          age groups and subject areas.
        </p>
      </div>
    ),
  },
  {
    question: "Do I need technical expertise to implement these strategies?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          No advanced technical skills required! While we introduce various AI tools, our focus 
          is on pedagogical strategy rather than technical implementation. We provide step-by-step 
          guidance and practical examples that any educator can follow, regardless of their 
          technology comfort level.
        </p>
      </div>
    ),
  },
  {
    question: "What kind of support do you provide after workshops?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          Workshop participants receive ongoing support including access to our educator community, 
          monthly Q&A sessions with Dr. Lee, implementation resources, and email support for specific 
          questions about applying productive struggle methodology in their classrooms.
        </p>
      </div>
    ),
  },
  {
    question: "How do I know if this approach will work in my classroom?",
    answer: (
      <div className="space-y-2 leading-relaxed">
        <p>
          Our methodology is grounded in peer-reviewed educational research and has been tested 
          across diverse classroom environments. We recommend starting with our free Chapter 1 
          preview to see the research foundation, then attending a workshop to experience the 
          practical application firsthand.
        </p>
      </div>
    ),
  },
];

// FAQ Schema for structured data
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqList.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.question.includes("productive struggle") 
        ? "Productive struggle is a research-based educational approach that recognizes cognitive effort as essential for meaningful learning. Rather than eliminating challenges, it strategically uses AI tools to enhance learning while preserving the mental work students need to develop deep understanding and critical thinking skills."
        : faq.question.includes("different from other AI")
        ? "Most AI education tools focus on making learning easier or faster. Our approach recognizes that some difficulty is necessary for learning. We teach educators how to use AI as a thinking partner rather than a replacement for student thinking, maintaining the productive friction that leads to genuine understanding."
        : faq.question.includes("K-12 teachers")
        ? "Our methodology works for both K-12 and college educators. The principles of productive struggle apply across all educational levels, though implementation strategies may vary. Our workshops and resources provide specific examples and techniques tailored to different age groups and subject areas."
        : faq.question.includes("technical expertise")
        ? "No advanced technical skills required! While we introduce various AI tools, our focus is on pedagogical strategy rather than technical implementation. We provide step-by-step guidance and practical examples that any educator can follow, regardless of their technology comfort level."
        : faq.question.includes("support")
        ? "Workshop participants receive ongoing support including access to our educator community, monthly Q&A sessions with Dr. Lee, implementation resources, and email support for specific questions about applying productive struggle methodology in their classrooms."
        : "Our methodology is grounded in peer-reviewed educational research and has been tested across diverse classroom environments. We recommend starting with our free Chapter 1 preview to see the research foundation, then attending a workshop to experience the practical application firsthand."
    }
  }))
};

const FaqItem = ({ item }: { item: FAQItemProps }) => {
  const accordion = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li>
      <button
        className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        aria-expanded={isOpen}
      >
        <span
          className={`flex-1 text-base-content ${isOpen ? "text-primary" : ""}`}
        >
          {item?.question}
        </span>
        <svg
          className={`flex-shrink-0 w-4 h-4 ml-auto fill-current`}
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center transition duration-200 ease-out ${
              isOpen && "rotate-180"
            }`}
          />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform origin-center rotate-90 transition duration-200 ease-out ${
              isOpen && "rotate-180 hidden"
            }`}
          />
        </svg>
      </button>

      <div
        ref={accordion}
        className={`transition-all duration-300 ease-in-out opacity-80 overflow-hidden`}
        style={
          isOpen
            ? { maxHeight: accordion?.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0 }
        }
      >
        <div className="pb-5 leading-relaxed">{item?.answer}</div>
      </div>
    </li>
  );
};

const FAQ = () => {
  return (
    <>
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      <section className="bg-base-200" id="faq">
        <div className="py-24 px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex flex-col text-left basis-1/2">
            <p className="inline-block font-semibold text-primary mb-4">FAQ</p>
            <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
              Frequently Asked Questions
            </p>
          </div>

          <ul className="basis-1/2">
            {faqList.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default FAQ;
