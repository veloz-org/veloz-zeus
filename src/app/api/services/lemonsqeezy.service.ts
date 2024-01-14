import axios from "axios";
import env from "../config/env";
import { LemonsqueezyConfig } from "../config";
import { pricingPlans } from "@/data/pricing/plan";

const IN_TEST_MODE = process.env.SERVER_ENV === "development";

// create lemonsqueezy checkout
export default class LemonsqueezyServices {
  // create checkout
  public async createCheckout(
    prod_id: string,
    duration: string,
    custom_data?: object
  ) {
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
              id: LemonsqueezyConfig.store_id,
            },
          },
          variant: {},
        },
      },
    };
    let response: {
      error: null | string;
      data: { url: null | string } | null;
    } = { error: null, data: { url: null } };
    try {
      // get variants
      const variants = [];

      for (const plan of pricingPlans) {
        if (String(plan.product_id) === prod_id) {
          for (const variant of plan?.variants) {
            const durationEq = variant.duration === duration;
            if (IN_TEST_MODE) durationEq && variants.push(variant);
            else durationEq && variants.push(variant);
          }
        }
      }

      payload.data.relationships.variant = {
        data: {
          type: "variants",
          id: IN_TEST_MODE
            ? String(variants[0].test_variant_id)
            : String(variants[0].id),
        },
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

  //   get subscription variants
  public async getProductVariants() {
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
        const price = v.attributes.price;
        const prodId = v.attributes.product_id;
        return {
          type: v.type,
          price: price / 100,
          variant_id: v.id,
          duration: v.attributes.interval,
          product_id: prodId,
          isSubscription: v.attributes.is_subscription,
          plan: pricingPlans.find((p) => p.product_id === prodId)?.name ?? null,
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

      const data = resp?.data.map((p: any) => {
        return {
          prod_id: p?.id,
          name: p?.attributes?.name,
          price: p?.attributes?.price,
          price_formatted: p?.attributes?.price_formatted,
        };
      });

      response.data = data;
      return response;
    } catch (e: any) {
      const msg = e.response?.data?.errors[0].detail ?? e.message;
      console.log(msg);
      response.error = `Error creating checkout.` as any;
      return response;
    }
  }

  async getLemonsqueezyStores() {
    const api = `https://api.lemonsqueezy.com/v1/stores`;
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
      },
    });

    const data = res.data;

    if (data?.data) {
      const stores = data?.data;
      const _stores = stores.map((s: any) => {
        return {
          id: s.id,
          name: s.attributes.name,
        };
      });
      return _stores;
    }
    return [];
  }

  async getCustomerPortalUrl(customer_id: string) {
    const api = `https://api.lemonsqueezy.com/v1/customers/${customer_id}`;
    const res = await axios.get(api, {
      headers: {
        Authorization: `Bearer ${env.LEMONSQUEEZY_API_KEY}`,
      },
    });

    const data = res.data;

    if (data?.data) {
      const url = data?.data?.attributes?.urls?.customer_portal;
      return url;
    }
    return null;
  }
}
