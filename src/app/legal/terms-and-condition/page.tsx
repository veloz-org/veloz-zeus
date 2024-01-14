"use client";
/* eslint-disable react/no-unescaped-entities */
import { FlexColStart, FlexRowStart } from "@/components/Flex";
import Footer from "@/components/Footer";
import { ArrowLeftToLine } from "lucide-react";
import Link from "next/link";
import React from "react";

const limitationOfUse = [
  "Modify, copy, prepare derivative works of, decompile, or reverse engineer any materials and software contained on this website.",
  "Remove any copyright or other proprietary notations from any materials and software on this website.",
  "Transfer the materials to another person or “mirror” the materials on any other server.",
  "Knowingly or negligently use this website or any of its associated services in a way that abuses or disrupts our networks or any other service Veloz provides.",
  "Use this website or its associated services to transmit or publish any harassing, indecent, obscene, fraudulent, or unlawful material.",
  "Use this website or its associated services in violation of any applicable laws or regulations.",
  "Use this website in conjunction with sending unauthorized advertising or spam.",
  "Harvest, collect, or gather user data without the user’s consent.",
  "Use this website or its associated services in such a way that may infringe the privacy, intellectual property rights, or other rights of third parties.",
];

function TermsAndCondition() {
  return (
    <>
      <FlexColStart className="w-full h-full min-h-screen gap-0 bg-dark-100 scroll-smooth ">
        <FlexColStart className="w-full h-auto md:max-w-[60%] px-9 py-9 mx-auto ">
          <FlexRowStart className="py-4">
            <Link
              href="#"
              onClick={() => window.history.back()}
              className="underline w-auto flex gap-2 items-center justify-start"
            >
              <ArrowLeftToLine
                size={15}
                className="text-white-300 group-hover:text-white-100 transition-all"
              />
              <span className="text-white-300 group-hover:text-white-100 text-[12px] transition-all font-ppSB">
                Back
              </span>
            </Link>
          </FlexRowStart>
          <h1 className="text-white-100 font-ppSB">Terms and Conditions</h1>
          <br />
          <p className="text-white-300 font-ppReg text-[15px] ">
            These Terms of Service govern your use of the website located at
            <a
              href="https://tryveloz.com"
              className="text-white-100 font-ppSB ml-1 underline"
            >
              https://tryveloz.com
            </a>{" "}
            and any related services provided by Veloz.
          </p>
          <p className="text-white-300 font-ppReg text-[15px] ">
            By accessing{" "}
            <a
              href="https://tryveloz.com"
              className="text-white-100 font-ppSB ml-1 underline"
            >
              https://tryveloz.com
            </a>{" "}
            , you agree to abide by these Terms of Service and comply with all
            applicable laws and regulations. If you do not agree with these
            Terms of Service, you are prohibited from using or accessing this
            website or using any other services provided by Veloz.
          </p>
          <p className="text-white-300 font-ppReg text-[15px] ">
            We, Veloz, reserve the right to review and amend any of these Terms
            of Service at our sole discretion. Upon doing so, we will update
            this page. Any changes to these Terms of Service will take effect
            immediately from the date of publication.
          </p>
          <p className="text-white-300 font-ppReg text-[15px] ">
            These Terms of Service were last updated on{" "}
            <span className="text-white-100 font-ppSB">11 December 2023</span>.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Limitations of Use</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            By using this website, you warrant on behalf of yourself, your
            users, and other parties you represent that you will not:
          </p>
          <ul className=" list-decimal  ">
            {limitationOfUse.map((d, i) => (
              <li key={i} className="text-white-300 font-ppReg text-[14px] ">
                {d}
              </li>
            ))}
          </ul>
          <br />
          <h1 className="text-white-100 font-ppSB">Intellectual Property</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            The intellectual property in the materials contained on this website
            is owned by or licensed to Veloz and is protected by applicable
            copyright and trademark law. We grant our users permission to
            download one copy of the materials for personal, non-commercial
            transitory use.
          </p>
          <p className="text-white-300 font-ppReg text-[15px] ">
            This constitutes the grant of a license, not a transfer of title.
            This license shall automatically terminate if you violate any of
            these restrictions or the Terms of Service and may be terminated by
            Veloz at any time.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Liability</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            Veloz provides its website and materials 'as is'. We offer no
            explicit or implied warranties and, where the law allows, we
            disclaim all warranties, including but not limited to, implied
            warranties of merchantability, suitability for a specific purpose,
            and non-infringement of intellectual property or other rights.
          </p>
          <p className="text-white-300 font-ppReg text-[15px] ">
            In no event shall Veloz or its suppliers be liable for any
            consequential loss suffered or incurred by you or any third party
            arising from the use or inability to use this website or the
            materials on this website, even if Veloz or an authorized
            representative has been notified, orally or in writing, of the
            possibility of such damage.
          </p>
          <p className="text-white-300 font-ppReg text-[15px] ">
            In the context of this agreement, &apos;consequential loss&apos;
            includes any consequential loss, indirect loss, real or anticipated
            loss of profit, loss of benefit, loss of revenue, loss of business,
            loss of goodwill, loss of opportunity, loss of savings, loss of
            reputation, loss of use and/or loss or corruption of data, whether
            under statute, contract, equity, tort (including negligence),
            indemnity, or otherwise.
          </p>
          <p className="text-white-300 font-ppReg text-[15px] ">
            Because some jurisdictions do not allow limitations on implied
            warranties, or limitations of liability for consequential or
            incidental damages, these limitations may not apply to you.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Accuracy of Materials</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            The materials appearing on our website are not comprehensive and are
            for general information purposes only. Veloz does not warrant or
            make any representations concerning the accuracy, likely results, or
            reliability of the use of the materials on this website, or
            otherwise relating to such materials or on any resources linked to
            this website.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Links</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            Veloz has not reviewed all of the sites linked to its website and is
            not responsible for the contents of any such linked site. The
            inclusion of any link does not imply endorsement, approval, or
            control by Veloz of the site. Use of any such linked site is at your
            own risk and we strongly advise you make your own investigations
            with respect to the suitability of those sites.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Right to Terminate</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            We may suspend or terminate your right to use our website and
            terminate these Terms of Service immediately upon written notice to
            you for any breach of these Terms of Service.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Severance</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            Any term of these Terms of Service which is wholly or partially void
            or unenforceable is severed to the extent that it is void or
            unenforceable. The validity of the remainder of these Terms of
            Service is not affected.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Governing Law</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            These Terms of Service are governed by and construed in accordance
            with the laws of the State of California. You irrevocably submit to
            the exclusive jurisdiction of the courts in that State or location.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Products and Services</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            All products and services are delivered by Veloz. Purchases can be
            accessed and downloaded from a private Github repository.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Security</h1>
          <p className="text-white-300 font-ppReg text-[15px] ">
            Veloz does not process any order payments through the website. All
            payments are processed securely through{" "}
            <a href="Lemonsqueezy" className="text-white-100 font-ppSB">
              Lemonsqueezy
            </a>
            , a third-party online payment provider.
          </p>
          <br />
          <h1 className="text-white-100 font-ppSB">Privacy and Policy</h1>
          <p className="text-white-300 font-ppReg text-[15px]">
            Read our{" "}
            <a
              href="https://www.privacyboard.co/company/veloz?tab=privacy-policy"
              className="text-white-100 underline font-ppSB"
            >
              privacy policy
            </a>{" "}
            for more information.
          </p>
        </FlexColStart>
        <div className="w-full py-[5em]"></div>
        <Footer />
      </FlexColStart>
    </>
  );
}

export default TermsAndCondition;
