// src/app/api/index/route.ts
import axios from 'axios';
import * as cheerio from 'cheerio';

interface InputField {
  name: string;
  type: string;
  maxlength: string;
  id: string;
  placeholder: string;
}

// const URL = "https://udyamregistration.gov.in/UdyamRegistration.aspx";

export async function GET() {
  try {
    const response = await axios.get("https://udyamregistration.gov.in/UdyamRegistration.aspx", {
      headers: { 'User-Agent': 'Mozilla/5.0' } // mimic a browser
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const inputs: InputField[] = [];

    $('input').each((_, el) => {
      inputs.push({
        name: $(el).attr('name') || '',
        type: $(el).attr('type') || '',
        maxlength: $(el).attr('maxlength') || '',
        id: $(el).attr('id') || '',
        placeholder: $(el).attr('placeholder') || '',
      });
    });

    return new Response(JSON.stringify({ input: inputs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching or parsing:', err);

    return new Response(JSON.stringify({ error: 'Failed to fetch or parse data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


/*
Preserved your original comment here:

// const headings: string[] = [];
// $('h1, h2, h3').each((_, el) => {
//   headings.push($(el).text().trim());
// });

// Save to file (optional for debugging)
// fs.writeFileSync('scrapedData.json', JSON.stringify(headings, null, 2));
// fs.writeFileSync('scrapedData.html', JSON.stringify(headings, null, 2));
*/
