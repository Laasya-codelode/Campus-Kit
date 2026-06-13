export const YEAR_COLORS = {
  freshman:  { accent: '#FF6B9D', dim: '#FF6B9D22', border: '#FF6B9D44' },
  sophomore: { accent: '#39D0C4', dim: '#39D0C422', border: '#39D0C444' },
  junior:    { accent: '#F0B429', dim: '#F0B42922', border: '#F0B42944' },
  senior:    { accent: '#BC8CFF', dim: '#BC8CFF22', border: '#BC8CFF44' },
}

export const YEARS = ['freshman', 'sophomore', 'junior', 'senior']
export const DAYS  = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export const CHECKLISTS = {
  freshman: [
    { cat: '🏠 Housing & Dorm', items: ['Bedding & pillows (twin XL)', 'Desk lamp', 'Power strip / surge protector', 'Laundry basket + detergent', 'Command hooks & strips', 'Shower caddy & flip-flops', 'First-aid kit', 'Mini fan or heater'] },
    { cat: '📚 Academic',       items: ['Student ID card', 'Course syllabi printed', 'Scientific calculator', 'Notebooks & folders', 'Academic planner', 'Library card activated', 'Visit advisor', 'USB drive / cloud storage'] },
    { cat: '💻 Tech',           items: ['Laptop + charger', 'Laptop sleeve / bag', 'Headphones', 'Campus WiFi connected', 'University email set up', 'Required software installed', 'External backup drive'] },
    { cat: '🏥 Health',         items: ['Health insurance on file', 'Immunisation records submitted', 'Campus health centre located', 'Mental health resources saved', 'Prescriptions transferred'] },
    { cat: '💰 Finance',        items: ['Student bank account opened', 'FAFSA confirmed', 'Dining plan activated', 'Budget spreadsheet created', 'Tuition payment plan set'] },
  ],
  sophomore: [
    { cat: '🗺 Campus Life',    items: ['Joined 1–2 clubs or orgs', 'Know your academic advisor', 'Upper-division course plan drafted', 'Explored all campus resources', 'Study spots mapped out'] },
    { cat: '📚 Academic',       items: ['Major declared (or in progress)', 'Met advisor this semester', 'Study group formed', 'Midterm & final dates on calendar', 'Office hours visited at least once'] },
    { cat: '💼 Career',         items: ['Résumé first draft done', 'LinkedIn profile created', 'Career centre visited', 'Internship search started', 'Relevant clubs joined'] },
    { cat: '💻 Tech',           items: ['Laptop/software updated', 'Cloud backup routine set', 'Note-taking system refined', 'Printing credits checked'] },
    { cat: '💰 Finance',        items: ['Scholarship search ongoing', 'Budget reviewed & updated', 'Emergency fund started', 'Textbooks minimised (rental/PDF)'] },
  ],
  junior: [
    { cat: '🎓 Academic',       items: ['Degree audit completed', 'Senior-year courses planned', 'Thesis or capstone topic chosen', 'Research project started', 'Recommendation letter requested'] },
    { cat: '💼 Career',         items: ['Internship secured or in progress', 'Résumé reviewed by career centre', 'Networking events attended', 'LinkedIn at 100+ connections', 'Portfolio / GitHub updated'] },
    { cat: '🌍 Experience',     items: ['Study abroad considered', 'Certifications outside major explored', 'Volunteer or leadership role held'] },
    { cat: '💰 Finance',        items: ['Summer income planned', 'Loan repayment plan drafted', 'Scholarship renewals confirmed', 'Senior-year budget outlined'] },
    { cat: '🏥 Wellbeing',      items: ['Stress management strategies set', 'Physical activity routine', 'Social connections maintained', 'Counselling or peer support used if needed'] },
  ],
  senior: [
    { cat: '🎓 Graduation',     items: ['Graduation application submitted', 'Degree audit cleared', 'Cap & gown ordered', 'Commencement tickets secured', 'Official transcript ordered'] },
    { cat: '💼 Job / Grad',     items: ['Job applications submitted', 'Grad school apps submitted', 'Offer letter reviewed before signing', 'References confirmed & thanked', 'Salary negotiation prepared'] },
    { cat: '📦 Moving On',      items: ['Dorm / apartment checkout noted', 'Change of address submitted', 'Alumni network joined', '.edu subscriptions migrated'] },
    { cat: '💰 Finance',        items: ['Loan exit counselling done', 'Repayment plan selected', 'Health insurance post-grad secured', 'First-job budget drafted'] },
    { cat: '🌟 Legacy',         items: ['Thanked a professor or mentor', 'Senior photos taken', 'Mentored a freshman', 'Celebrated the win! 🎉'] },
  ],
}
