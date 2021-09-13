import ForgeUI, { render, Fragment, Macro, Text, Badge, Strong, useState } from "@forge/ui";
import { fetch } from '@forge/api';

const createDocFromTemplate = async () => {
  const body = {
    "name": "Signature Doc",
    "template_uuid": "fQ9MKS9fuyb5ps38V5DZzW",
    "recipients": [
      {
        "email": "sbis1999@gmail.com",
        "first_name": "Souvik",
        "last_name": "Biswas"

      }
    ],
    "tokens": [
      {
        "name": "Favorite.Pet",
        "value": "Panda"
      }
    ],
    "fields": {
      "Favorite.Color": {
        "value": "PandaDoc green"
      },
      "Delivery": {
        "value": "Same Day Delivery"
      },
      "Like": {
        "value": true
      },
      "Date": {
        "value": "2019-12-31T00:00:00.000Z"
      }
    },
    "metadata": {
      "my_favorite_pet": "Panda"
    },
    "tags": [
      "created_via_api",
      "test_document"
    ],
    "pricing_tables": [
      {
        "name": "Pricing Table 1",
        "options": {
          "currency": "USD",
          "discount": {
            "is_global": true,
            "type": "absolute",
            "name": "Discount",
            "value": 2.26
          }
        },
        "sections": [
          {
            "title": "Sample Section",
            "default": true,
            "rows": [
              {
                "options": {
                  "optional": true,
                  "optional_selected": true,
                  "qty_editable": true
                },
                "data": {
                  "name": "Toy Panda",
                  "description": "Fluffy!",
                  "price": 10,
                  "qty": 3,
                  "tax_first": {
                    "value": 7.5,
                    "type": "percent"
                  }
                },
                "custom_fields": {
                  "Fluffiness": "5 / 5"
                }
              }
            ]
          }
        ]
      }
    ],
    "content_placeholders": [
      {
        "block_id": "12345",
        "content_library_items": [
          {
            "id": "manbis1964@gmail.com",
            "pricing_tables": [
              {
                "name": "Pricing Table 1",
                "options": {
                  "currency": "USD",
                  "discount": {
                    "is_global": true,
                    "type": "absolute",
                    "name": "Discount",
                    "value": 2.26
                  }
                },
                "sections": [
                  {
                    "title": "Sample Section",
                    "default": true,
                    "rows": [
                      {
                        "options": {
                          "optional": true,
                          "optional_selected": true,
                          "qty_editable": true
                        },
                        "data": {
                          "name": "Placeholder Panda",
                          "price": 10,
                          "qty": 3
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "id": "gaubis1960@gmail.com",
            "recipients": [
              {
                "email": "sbis1999@gmail.com",
                "first_name": "Souvik",
                "last_name": "Biswas"

              }
            ],
            "fields": {
              "Date": {
                "value": "2019-12-31T00:00:00.000Z"
              }
            }
          }
        ]
      }
    ]
  };

  const result = await fetch(
    `https://api.pandadoc.com/public/v1/documents`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'API-Key <panda-docs-api-key>',
      }
    }
  );

  const data = await result.json();

  const status = await result.status;
  console.log(status);

  return data;
};

const App = () => {

  const [data] = useState(async () => await createDocFromTemplate());

  const documentID = data["id"];
  const documentName = data["name"];
  const documentStatus = data["status"];
  const documentDate = data["date_created"];

  console.log(`Doc ID: ${documentID}`);

  return (
    <Fragment>
      <Text>Your Panda Docs document is created, information is available below:</Text>
      <Text>
        <Badge appearance="added" text={documentStatus} />
        <Badge appearance="primary" text={documentDate} />
      </Text>
      <Text><Strong>Document ID: </Strong> {documentID}</Text>
      <Text><Strong>Document Name: </Strong> {documentName}</Text>
    </Fragment>
  );
};

export const run = render(
  <Macro
    app={<App />}
  />
);
