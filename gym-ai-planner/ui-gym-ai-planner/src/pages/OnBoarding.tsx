import {useAuth} from "../context/AuthContext.tsx";
import {RedirectToSignIn, SignedIn} from "@neondatabase/neon-js/auth/react";
import {Card} from "../components/ui/Card.tsx";
import {Select} from "../components/ui/Select.tsx";
import {useState} from "react";
import {Textarea} from "../components/ui/Textarea.tsx";
import {Button} from "../components/ui/Button.tsx";
import {ArrowRight} from "lucide-react";
import * as React from "react";
import type {IUserProfile} from "../types";

const goalOptions = [
  {value: "bulk", label: "Build Muscle (Bulk)"},
  {value: "cut", label: "Lose Fat (Cut)"},
  {value: "recomp", label: "Body Recomposition (Recomp)"},
  {value: "strength", label: "Build Strength (Strength)"},
  {value: "endurance", label: "Improve Endurance (Endurance)"},
];

const exerciseOptions = [
  {value: "beginner", label: "Beginner (0-1 years)"},
  {value: "intermediate", label: "Intermediate (1-3 years)"},
  {value: "advanced", label: "Advanced (3+ years)"},
];

const sessionOptions = [
  {value: "30", label: "30 minutes"},
  {value: "45", label: "45 minutes"},
  {value: "60", label: "60 minutes"},
  {value: "90", label: "90 minutes"},
]

const daysOptions = [
  {value: "2", label: "2 days per week"},
  {value: "3", label: "3 days per week"},
  {value: "4", label: "4 days per week"},
  {value: "5", label: "5 days per week"},
  {value: "6", label: "6 days per week"},
];

const equipmentOptions = [
  {value: "dumbbell", label: "Dumbbells Only"},
  {value: "full_gym", label: "Full Gym Access"},
  {value: "home", label: "Home Gym Access"},
];

const splitsOptions = [
  {value: "full_body", label: "Full Body"},
  {value: "upper_lower", label: "Upper/Lower Split"},
  {value: "ppl", label: "Push/Pull/Legs"},
  {value: "custom", label: "Let AI Decide"},
]

export default function OnBoarding() {
  const { user, saveProfile } = useAuth();
  const [formData, setFormData] = useState({
    goal: "bulk",
    experience: "intermediate",
    daysPerWeek: "4",
    sessionLength: "60",
    equipment: "full_gym",
    injuries: "",
    preferredSplit: "upper_lower",
  });

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const profile: Omit<IUserProfile, "userId" | "updatedAt"> = {
      goal: formData.goal as IUserProfile["goal"],
      experience: formData.experience as IUserProfile["experience"],
      daysPerWeek: parseInt(formData.daysPerWeek),
      sessionLength: parseInt(formData.sessionLength),
      equipment: formData.equipment as IUserProfile["equipment"],
      injuries: formData.injuries || undefined,
      preferredSplit: formData.preferredSplit as IUserProfile["preferredSplit"],
    };

    saveProfile(profile);
  }

  if (!user) {
    return <RedirectToSignIn />
  }

  return (
    <SignedIn>
      <div className={"min-h-screen pt-24 pb-12 px-6"}>
        <div className={"max-w-xl mx-auto"}>
          { /* progress indicator */}
          { /* Step 1: Questionnaire */}
          <Card variant={"bordered"}>
            <h1 className={"text-2xl font-bold mb-2"}>Tell us about yourself</h1>
            <p className={"text-muted-foreground mb-4"}>
              Help us create a personalized plan for you.
            </p>
            <form className={"space-y-4"} onSubmit={handleSubmit}>
              <Select
                id={"goal"}
                label={"What's your primary goal?"}
                options={goalOptions}
                value={formData.goal}
                onChange={(e) => setFormData({...formData, goal: e.target.value})}
              />
              <Select
                id={"experience"}
                label={"How long have you been working out?"}
                options={exerciseOptions}
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
              <div className={"grid grid-cols-2 gap-4"}>
                <Select
                  id={"daysPerWeek"}
                  label={"Days per Week"}
                  options={daysOptions}
                  value={formData.daysPerWeek}
                  onChange={(e) => setFormData({...formData, daysPerWeek: e.target.value})}
                />
                <Select
                  id={"sessionLength"}
                  label={"Session Length"}
                  options={sessionOptions}
                  value={formData.sessionLength}
                  onChange={(e) => setFormData({...formData, sessionLength: e.target.value})}
                />
              </div>
              <Select
                id={"equipment"}
                label={"Equipment Access"}
                options={equipmentOptions}
                value={formData.equipment}
                onChange={(e) => setFormData({...formData, equipment: e.target.value})}
              />
              <Select
                id={"preferredSplit"}
                label={"Preferred training split"}
                options={splitsOptions}
                value={formData.preferredSplit}
                onChange={(e) => setFormData({...formData, preferredSplit: e.target.value})}
              />
              <Textarea
                id={"injuries"}
                label={"Any injuries or disabilities? (optional)"}
                placeholder={"e.g., lower back issues, shoulder impingement..."}
                value={formData.injuries}
                rows={3}
                onChange={(e) => setFormData({...formData, injuries: e.target.value})}
              />

              <div className={"flex gap-4 pt-2"}>
                <Button type={"submit"} className={"flex-1 gap-2"}>
                  Generate my plan <ArrowRight className={"h-4 w-4"}/>
                </Button>
              </div>
            </form>
          </Card>

          { /* Step 2: Generating */}
        </div>
      </div>
    </SignedIn>
  )
}