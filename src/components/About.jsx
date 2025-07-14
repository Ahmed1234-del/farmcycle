import React from 'react'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 md:p-10">
      {/* Header with logo */}
      <header className="flex items-center gap-4 border-b pb-4 mb-8">
        <img src="logo" alt="FarmCycle Logo" className="h-16 w-16 rounded-full shadow" />
        <h1 className="text-3xl font-bold text-green-700">About FarmCycle</h1>
      </header>

      {/* Mission and Vision */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-green-600">Our Mission</h2>
        <p className="text-lg leading-relaxed">
          At <strong>FarmCycle</strong>, our mission is to empower farmers by connecting them directly
          with customers and buyers through a digital marketplace. We aim to reduce waste,
          increase agricultural income, and create a sustainable cycle where farm by-products
          and produce can be sold efficiently.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-green-600">Our Vision</h2>
        <p className="text-lg leading-relaxed">
          We envision a future where technology bridges the gap between farmers and the market,
          ensuring fair prices, reducing food waste, and promoting eco-friendly practices.
        </p>
      </section>

      {/* Services / Features */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-green-600">What We Offer</h2>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>Buy and sell farm products, waste, and by-products easily</li>
          <li>Real-time updates on available products</li>
          <li>Secure transactions and user-friendly interface</li>
          <li>Profile management for farmers and buyers</li>
          <li>Mobile-responsive design for rural accessibility</li>
        </ul>
      </section>

      {/* Contact */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2 text-green-600">Contact Us</h2>
        <p className="text-lg mb-2">
          Got questions, suggestions, or need support? Reach out to us!
        </p>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 shadow-sm">
          <p><strong>Email:</strong> support@farmcycle.com</p>
          <p><strong>Phone:</strong> +256 789 123 456</p>
          <p><strong>Location:</strong> Galkayo, Mudug Region, Somalia</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 border-t pt-4 mt-10">
        &copy; {new Date().getFullYear()} FarmCycle. All rights reserved.
      </footer>
    </div>
  )
}

export default AboutPage
