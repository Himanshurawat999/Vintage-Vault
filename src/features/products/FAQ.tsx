import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ = () => {
  const faqData: FAQItem[] = [
    {
      question: "What are the shipping options?",
      answer:
        "We offer various shipping options to ensure your order arrives safely and promptly. Standard shipping typically takes 5-7 business days, while express options are available for faster delivery. You can choose your preferred method at checkout.",
    },
    {
      question: "What is your return policy?",
      answer:
        "You may return most new, unopened items within 30 days of delivery for a full refund. Conditions apply.",
    },
    {
      question: "How do I care?",
      answer:
        "Follow the care instructions provided with your product. For most items, hand wash or gentle machine wash is recommended.",
    },
    {
      question: "Do you offer warranties?",
      answer:
        "Yes, we offer limited warranties on selected products. Please check product details for warranty coverage.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes, once your order is shipped, you will receive a tracking number via email.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 py-10 lg:px-10 lg:pt-28 flex flex-col sm:flex-row gap-12 sm:gap-0">
      <div id="left" className="w-[90%] sm:w-1/2">
        <p className="font-fraunces font-thin italic text-5xl md:text-6xl w-[50%]">
          Frequently Asked Questions
        </p>
      </div>
      <div id="right" className="w-[90%] sm:w-1/2">
        {faqData.map((faq, index) => (
            <div key={index} className="border-t border-zinc-400">
              <button
                className="w-full flex justify-between items-center py-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-medium text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-zinc-400" />
                ) : (
                  <Plus className="w-5 h-5 text-zinc-400" />
                )}
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-4 text-gray-600">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
