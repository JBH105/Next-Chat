/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark900': 'rgba(9, 4, 21, 0.9)',
        'gray700':'rgba(9, 4, 21, 0.65)',
        'gray801':'rgba(9, 4, 21, 0.8)',
        'gray850':'rgba(9, 4, 21, 0.85)',
        'gray800' :'rgba(9, 4, 21, 0.75)',
        'gray500':'rgba(9, 4, 21, 0.5)',
        'gray50':'rgba(9, 4, 21, 0.05)',
        'gray40':'rgba(9, 4, 21, 0.04)',
        'gray30':'rgba(9, 4, 21, 0.03)',
        'gray250':'rgba(9, 4, 21, 0.25)',
        'gray110':"#84828A",
        'violet600':'#5B26CF',
        'violet250':'#F5F3FF',
        'violet500':'#764AD7',
        'violet150':'#F4EFFF',
        'violet200':'rgba(91, 38, 207, 0.1)',
        'gray200':'#090415',
        'red500':'#FF0000',
        'main': '#2E1368',
        'text-blue':'#6a51d3',
        'secondary':'#5c47cf',
        'black500':'#322E3C',
        'black300':'#84818A',
        'blue100':'#F2EDFF',
        'black400':'#5B5863',
  
        'main-bg':'#FAF9FD',
        'green600':'#0CAE43',
        'black600':'#090415',
        'black200':'#ADABB1',
        'purple100':'#DED4F5',
        'second-bg':'#faf9fd',
        'pink600':'#D82594',
        'pink500':'#DE49A6',


      },
      boxShadow: {
        'dark200': '1px 1px 6px 1px rgba(9, 4, 21, 0.06)',
        'dark100':'2px 2px 12px rgba(0, 0, 0, 0.08)',
        'dark150':'0px 0px 40px rgba(0, 0, 0, 0.15)',
        'dark15':' 0px 1.41176px 7.05882px rgba(0, 0, 0, 0.15)',
        'mainbox': '0.5px 0.5px 20px #00000014',
        'innerbox': '1px 2px 10px #0000001f',
        'subbox':'0px 0px 5px rgba(0, 0, 0, 0.12)',
        'dark10':'0px 0.5px 7px rgba(0, 0, 0, 0.1)',
        'dark80':'0.8px 0.8px 15px rgba(0, 0, 0, 0.08)',
        'dark20':' 0px 2px 10px rgba(0, 0, 0, 0.1)',
        'drak170':'1px 1px 25px rgba(0, 0, 0, 0.07)',
        'blue100':"1px 1px 15px rgba(165, 150, 198, 0.5)",
        'dark1000':'1px 1px 25px rgba(0, 0, 0, 0.07)',
        'gark011':'0.8px 0.8px 10px rgba(0, 0, 0, 0.1)'
      },
      lineHeight: {
        '5.5':'22px'
      },
      backgroundImage: {
        'upload-img': "url('/assets/images/uploadimg.png')",
      }
    },
   
  },
}
