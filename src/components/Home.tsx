'use client'

// import Challenges from "@/app/(landing)/LandingPage/challenges/page";
// import WorkExperience from "@/app/(landing)/LandingPage/experience/page";
// import ExploreChallenges from "@/app/(landing)/LandingPage/explore/page";
import HowToGetStarted from "@/app/(landingPage)/Landing/howToGetStarted/page";
// import CareerCard from "@/app/(landing)/LandingPage/Journery/page";
import Banner from "@/app/(landingPage)/Landing/main/page";
import Recommended from "@/app/(landingPage)/Landing/Recommended/page"
import Benefits from "@/app/(landingPage)/Landing/Benefits/page"

// import SkillsChallenges from "@/app/(landing)/LandingPage/skillsChallenges/page";
// import Testimonials from "@/app/(landing)/LandingPage/Testimonies/page";



export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Banner />
            <HowToGetStarted />
            <Recommended />
            <Benefits />
            {/* <WorkExperience />
            <Challenges />
            <ExploreChallenges />
            <SkillsChallenges />
            <Testimonials />
            <CareerCard /> */}
        </div>
    );
}