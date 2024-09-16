import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CompetitionInstructions from "@/layout/@autochtone/CompetitionInstructions";
import Navigation from "@/layout/navigation/Navigation";

export default function PlayGuide() {
  return (
    <div className="container flex flex-col gap-10">
      <Navigation />
      <div className="w-full md:w-[60%] m-auto flex flex-col text-center gap-5">
        <h1 className="text-xl md:text-3xl	font-semibold	">How to play</h1>
        <p>
          If you can't find the answer you're looking for, please call us on +44
          <span className="border-b">(0)207 371 88 66</span> or e-mail 
          <a href="mailto:info@botb.com" className="border-b">
            info@botb.com
          </a>
           and we'll be delighted to help you.
        </p>
        <div className="text-left pt-10 flex flex-col gap-3">
          <h3 className="font-bold">Who are we?</h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It's animated by default, but you can disable it if you
                prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      <CompetitionInstructions />
    </div>
  );
}
