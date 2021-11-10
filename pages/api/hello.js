// hello.js
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://functional.works-hub.com/learn/setting-up-an-api-route-with-next-dot-js-7e8a9


// api/hello?fname=John&lname=Doe

export default async function handler(req, res) {
  
    const {
        fname,
        lname,
      } = req.query;

    res.statusCode = 200
    res.json({ name: `${fname} ${lname}` })


}