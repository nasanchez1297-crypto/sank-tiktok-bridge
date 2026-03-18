exports.handler = async () => {
  try {
    const grind = "whole_bean";

    const skuMap = {
      whole_bean: "COF-WHB-12O-COL-BOX",
      ground: "COF-GND-12O-COL-BOX"
    };

    const sku = skuMap[grind];

    const payload = {
      externalSourceId: "netlify-test-order-1",
      toAddress: {
        name: "Test Customer",
        company: "SANK Test",
        street1: "123 Test St",
        street2: "",
        city: "Miami",
        state: "FL",
        zip: "33101",
        country: "US",
        phone: "3055551234",
        email: "test@example.com"
      },
      items: [
        {
          sku: sku,
          artworkUrl: "https://d13jwb0zul8vwm.cloudfront.net/catalog-products/_public/268770a2-c67d-4b63-b816-96cd2ee714f7.webp",
          quantity: 1
        }
      ]
    };

    const response = await fetch("https://api.roastify.app/v1/orders", {
      method: "POST",
      headers: {
        "x-api-key": process.env.ROASTIFY_API_KEY_TEST,
        "Content-Type": "application/json",
        "Idempotency-Key": "test-order-1"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      body: JSON.stringify({
        ok: response.ok,
        status: response.status,
        selectedGrind: grind,
        selectedSku: sku,
        data: data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        ok: false,
        message: error.message
      })
    };
  }
};
