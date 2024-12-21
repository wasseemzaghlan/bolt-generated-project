"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, FileText, PenTool } from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "./RichTextEditor";
import { AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function ExamNotes() {
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleSaveNotes = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem("exam_notes", notes);
      toast({
        title: "Notes Saved",
        description: "Your notes have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save notes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <AccordionTrigger className="hover:no-underline">
        <Card className="w-full border-none bg-gradient-to-br from-card via-card/50 to-background">
          <div className="flex items-center gap-4 p-4">
            <div className="p-3 rounded-full bg-primary/10">
              <PenTool className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <h2 className="text-xl font-semibold">Instructions Editor</h2>
              <p className="text-sm text-muted-foreground">
                Add Custom Instructions and Notes
              </p>
            </div>
          </div>
        </Card>
      </AccordionTrigger>
      <AccordionContent>
        <Card className="border-none bg-gradient-to-br from-card/50 via-card/30 to-background mt-2">
          <CardContent className="pt-6">
            <div className="flex justify-end mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSaveNotes}
                disabled={isSaving}
                className="bg-primary/5 hover:bg-primary/10"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Instructions
              </Button>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <RichTextEditor
                value={notes}
                onChange={setNotes}
                placeholder="Add your exam instructions, reminders, or important points here..."
              />
              <p className="text-sm text-muted-foreground mt-2">
                These instructions will be available during the exam for your reference.
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </AccordionContent>
    </>
  );
}
