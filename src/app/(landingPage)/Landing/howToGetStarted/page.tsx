import React from 'react';

const steps = [
    {
        number: 1,
        title: 'Sign up on Uruyange Coffee',
        description: 'Submit your completed project for evaluation',
        image: '/images/ch1.JPG'
    },
    {
        number: 2,
        title: 'Register and Participate',
        description: 'Sign up for the challenge and start working on the project.',
        image: '/images/ch2.JPG'
    },
    {
        number: 3,
        title: 'Browse Open Challenges',
        description: 'Explore the range of challenges and hackathons and choose one that aligns with your interests and career goals',
        image: '/images/ch2.JPG'
    },
    {
        number: 4,
        title: 'Submit your work',
        description: 'Submit your completed project for evaluation',
        image: '/images/ch2.JPG'
    },
    {
        number: 5,
        title: 'Receive Feedback and Recognition',
        description: 'Get feedback on your work and celebrate your achievements',
        image: '/api/placeholder/280/200'
    }
];

const HowToGetStarted = () => {
    return (
        <div className="bg-white">
            <div className="max-w-6xl mx-auto py-16 px-4">
                <h2 className="text-2xl font-bold text-center text-[#1a1a1a] mb-12">
                    How to Get Started
                </h2>

                <div className="grid grid-cols-1 gap-12">
                    {steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={`flex items-start gap-4 ${index % 2 === 0 ? 'pr-[50%]' : 'pl-[50%]'}`}
                        >
                            <div className="flex-shrink-0">
                                <div className="h-6 w-16 bg-blue-600 rounded-md flex items-center justify-center">
                                    <span className="text-white text-xs font-medium">
                                        Step {step.number}
                                    </span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-1">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    {step.description}
                                </p>
                                {index === 0 || index === 2 ? (
                                    <div className="rounded-lg overflow-hidden border border-gray-200">
                                        <img
                                            src={step.image}
                                            alt={`Step ${step.number}`}
                                            className="w-full h-48 object-cover"
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowToGetStarted;