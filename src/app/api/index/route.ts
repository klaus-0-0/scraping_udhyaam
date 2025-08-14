import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';

const url = "https://udyamregistration.gov.in/UdyamRegistration.aspx";

// Export a named async GET handler (required for Next.js app router API routes)
export async function GET() {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // FIX: inputs should be an array of objects, not string[]
    // Also interface declaration inside function is not standard, define outside if needed
    interface InputField {
      name: string;
      type: string;
      maxlength: string;
      id: string;
      placeholder: string;
    }

    // Declare inputs array with correct type
    const inputs: InputField[] = [];

    // Loop through all input elements and push the relevant attributes
    $('input').each((_, el) => {
      inputs.push({
        name: $(el).attr('name') || '',
        type: $(el).attr('type') || '',
        maxlength: $(el).attr('maxlength') || '',
        id: $(el).attr('id') || '',
        placeholder: $(el).attr('placeholder') || '',
      });
    });

    // Write to file (optional, may fail in some environments)
    // try {
    //   fs.writeFileSync('scrapAadharData.json', JSON.stringify(inputs, null, 2));
    // } catch (e) {
    //   // This can fail in serverless/restricted environments, so warn only
    //   console.warn('Could not write file:', e);
    // }

    // Return JSON response with extracted input fields
    return new Response(JSON.stringify({ input: inputs }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error fetching or parsing:', err);

    return new Response(JSON.stringify({ error: 'Failed to read or parse data' }), {
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
