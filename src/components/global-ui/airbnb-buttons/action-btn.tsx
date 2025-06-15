import { Button } from "@/components/ui/button";

export function ActionBtn(props: React.ComponentProps<typeof Button>) {
  return (
    <Button
      className="p-6 w-full bg-brand-primary text-white
             hover:bg-brand-primary/90 hover:text-white shrink"
      {...props}
    />
  );
}
