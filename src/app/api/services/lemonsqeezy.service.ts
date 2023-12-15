import axios from "axios";
import env from "../config/env";
import { lemonsqueezyConfig } from "../config";

const IN_TEST_MODE = process.env.NODE_ENV === "development";

// create lemonsqueezy checkout
export default class LemonsqueezyServices {
  // create checkout
  public async createCheckout(custom_data?: object) {
    const custom_redirect_url = `${env.BASE_URL}/app/settings`;

    const payload = {
      data: {
        type: "checkouts",
        attributes: {
          product_options: {
            enabled_variants: [],
            redirect_url: custom_redirect_url,
          },
          checkout_options: {},
          checkout_data: {
            //   discount_code: "10PERCENTOFF",
            variant_quantities: [],
            custom: custom_data ?? {},
          },
          preview: true,
        },
        relationships: {
          store: {
            data: {
              type: "stores",
              id: lemonsqueezyConfig.store_id,
            },
          },
          variant: {},
        },
        test_mode: IN_TEST_MODE,
      },
    };
    let response = { error: null, data: null };
    try {
      // get variants
      const variants = await this.getProductVariants();
      if (variants.error) {
        return variants;
      }

      payload.data.relationships.variant = {
        data: variants?.data as any,
      };

      const url = `https://api.lemonsqueezy.com/v1/checkouts`;
      const res = await axios.post(url, payload, {
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
        },
      });
      const resp = res.data;

      const checkoutUrl = resp?.data?.attributes?.url;
      response.data = { url: checkoutUrl } as any;
    } catch (e: any) {
      const msg = e.response?.data?.errors[0].detail ?? e.message;
      console.log(msg);
      response.error = `Error creating checkout.` as any;
    }
    return response;
  }

  private async getProductVariants() {
    let response = { error: null, data: null } as any;
    try {
      const url = `https://api.lemonsqueezy.com/v1/variants`;
      const res = await axios.get(url, {
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
        },
      });
      const resp = res.data;

      const variantData = resp?.data.map((v: any) => {
        return {
          type: v.type,
          id: v.id,
        };
      });
      response.data = variantData as {
        type: string;
        id: string;
      }[];
      return response;
    } catch (e: any) {
      const msg = e.response?.data?.errors[0].detail ?? e.message;
      console.log(msg);
      response.error = `Error creating checkout.` as any;
      return response;
    }
  }

  // only used during development
  public async getProducts(store_id: string) {
    let response = { error: null, data: null } as any;
    try {
      const url = `https://api.lemonsqueezy.com/v1/products?filter[store_id]=${store_id}`;
      const res = await axios.get(url, {
        headers: {
          Accept: "application/vnd.api+json",
          Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
        },
      });
      const resp = res.data;

      console.log({ resp });

      //   response.data = variantData as {
      //     type: string;
      //     id: string;
      //   }[];
      return response;
    } catch (e: any) {
      const msg = e.response?.data?.errors[0].detail ?? e.message;
      console.log(msg);
      response.error = `Error creating checkout.` as any;
      return response;
    }
  }
}
