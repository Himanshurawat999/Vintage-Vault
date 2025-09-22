import type { ButtonHTMLAttributes } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Loader } from 'lucide-react'; // Lucide spinner icon

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isPending?: boolean;
}

const LoadingButton = ({
  text,
  isPending = false,
  disabled,
  type
}: LoadingButtonProps) => {
  const isDisabled = disabled ?? isPending;

  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`w-[90%] ${isPending ? "bg-zinc-200 hover:bg-zinc-300" : "bg-orange-400 hover:bg-orange-500 text-zinc-200"} py-2 px-6 rounded-md mt-2 ml-1 font-medium text-lg cursor-pointer disabled:cursor-not-allowed`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isPending ? 'loading' : 'text'}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.15 }}
          className="flex items-center justify-center gap-2"
        >
          {isPending ? (
            <Loader className="h-4 w-4 animate-spin my-1 " />
          ) : (
            text
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
};

export default LoadingButton;
