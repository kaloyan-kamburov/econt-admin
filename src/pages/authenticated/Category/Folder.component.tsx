import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

//icons
import iconMap from "../../../Icons/map.svg";
import { IconDots, IconPlus } from "../../../Icons/icons";

//MUI component
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

//custom components
import AddFolder from "./Folder.add.component";
import EditFolder from "./Folder.edit.component";
import ArchiveFolder from "./Folder.archive.component";
import PublishFolder from "./Folder.publish.component";
import UnpublishFolder from "./Folder.unpublish.component";
import DeleteFolder from "./Folder.delete.component";
import Modal from "../../../components/common/Modal/Modal.component";

//theme
import { bgSections, btnContainedPrimaryBgColor, lightColor } from "../../../styles/theme";

const FolderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.archived {
    opacity: 0.5;
  }

  .bg-wrapper {
    width: 218px;
    height: 150px;
    position: relative;
    // background: red;

    &.default {
      > svg {
        position: relative;
        top: -8px;
        left: -11px;
      }
    }
  }

  .img-wrapper {
    position: absolute;
    width: 70px;
    height: 70px;
    cursor: pointer;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .content {
    padding-top: var(--atom);
    // padding-top: 14px;
    display: flex;
    justify-content: center;
    position: relative;
    z-intex: 1;
    span {
      //   font-size: calc(3 * var(--atom));
      //   line-height: calc(5 * var(--atom));
      font-size: 15px;
      line-height: 25px;
    }
  }

  .add-wrapper {
    position: absolute;
    top: 40px;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    z-index: 2;

    span {
      font-size: 15px;
      line-height: 25px;
      color: ${btnContainedPrimaryBgColor};
      font-weight: 600;
      margin-top: 7px;
    }
  }

  .menu-wrapper {
    position: absolute;
    top: 38px;
    left: 180px;
    z-index: 2;

    // .btn-menu {
    //   &.active {
    //     background: ${lightColor};
    //     opacity: 0.15;
    //   }
    // }

    .sub-menu {
      display: flex;
      position: absolute;
      // top: calc(8 * var(--atom));
      right: calc(2 * var(--atom));
      top: 30px;
      right: 10px;
      background: ${bgSections};
      box-shadow: 0px calc(0.8 * var(--atom)) calc(2.4 * var(--atom)) rgba(0, 0, 0, 0.15);
      border-radius: calc(0.8 * var(--atom));
      flex-direction: column;

      button {
        font-size: calc(4 * var(--atom));
        line-height: calc(5.4 * var(--atom));
        padding: 0 calc(3 * var(--atom));
        justify-content: flex-start;
        white-space: nowrap;
      }
    }
  }
`;

const renderBackground = (isAdd: boolean) =>
  isAdd ? (
    <svg
      width="216"
      height="150"
      viewBox="0 0 216 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bg"
    >
      <mask
        id="path-1-inside-1_369_9970"
        fill="white"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M157.018 21.0562C148.03 10.7575 138.65 0.00937118 131.95 0.00937118H12.2652C12.2626 0.00937118 12.2605 0.00727789 12.2605 0.0046957C12.2605 0.00211908 12.2584 2.79468e-05 12.2558 2.1698e-05C9.01275 -0.00784346 5.90033 2.12282 3.60231 5.92417C1.30318 9.72735 0.00745027 14.8915 0 20.2811V33V39.6V142C0 146.418 3.58172 150 8 150H208C212.418 150 216 146.418 216 142V41C216 36.5817 212.418 33 208 33H172.836C169.7 33 166.675 31.7858 164.536 29.4923C162.11 26.8895 159.58 23.9911 157.018 21.0562Z"
        />
      </mask>
      <path
        d="M157.018 21.0562L156.642 21.3849L157.018 21.0562ZM3.60231 5.92417L4.0302 6.18284L3.60231 5.92417ZM0 20.2811L-0.5 20.2804V20.2811H0ZM164.536 29.4923L164.902 29.1513L164.536 29.4923ZM12.2558 2.1698e-05L12.257 -0.499977L12.2558 2.1698e-05ZM131.95 -0.490629H129.955V0.509371H131.95V-0.490629ZM125.966 -0.490629H121.976V0.509371H125.966V-0.490629ZM117.987 -0.490629H113.997V0.509371H117.987V-0.490629ZM110.008 -0.490629H106.018V0.509371H110.008V-0.490629ZM102.029 -0.490629H98.0393V0.509371H102.029V-0.490629ZM94.0499 -0.490629H90.0603V0.509371H94.0499V-0.490629ZM86.0708 -0.490629H82.0814V0.509371H86.0708V-0.490629ZM78.0919 -0.490629H74.1024V0.509371H78.0919V-0.490629ZM70.1129 -0.490629H66.1234V0.509371H70.1129V-0.490629ZM62.1339 -0.490629H58.1444V0.509371H62.1339V-0.490629ZM54.1549 -0.490629H50.1654V0.509371H54.1549V-0.490629ZM46.1759 -0.490629H42.1864V0.509371H46.1759V-0.490629ZM38.1969 -0.490629H34.2074V0.509371H38.1969V-0.490629ZM30.2179 -0.490629H26.2284V0.509371H30.2179V-0.490629ZM22.2389 -0.490629H18.2494V0.509371H22.2389V-0.490629ZM14.2599 -0.490629H12.2652V0.509371H14.2599V-0.490629ZM12.2652 -0.490629C12.3314 -0.490629 12.3958 -0.477353 12.4549 -0.452847L12.0718 0.470879C12.132 0.495843 12.1976 0.509371 12.2652 0.509371V-0.490629ZM12.7227 -0.185041C12.7472 -0.125945 12.7605 -0.0615447 12.7605 0.0046957H11.7605C11.7605 0.072204 11.774 0.137814 11.799 0.198012L12.7227 -0.185041ZM12.7605 0.0046957C12.7605 -0.0628987 12.7469 -0.128538 12.722 -0.188713L11.7983 0.19453C11.7738 0.135456 11.7605 0.0710244 11.7605 0.0046957H12.7605ZM12.4499 -0.461167C12.3899 -0.486162 12.3244 -0.499813 12.257 -0.499977L12.2546 0.50002C12.1884 0.49986 12.1242 0.486463 12.0653 0.461926L12.4499 -0.461167ZM12.257 -0.499977C11.2847 -0.502335 10.326 -0.324666 9.39863 0.0191376L9.74623 0.956779C10.5671 0.652473 11.4074 0.497966 12.2546 0.50002L12.257 -0.499977ZM4.81938 3.37349C4.23444 4.05661 3.68401 4.82255 3.17442 5.6655L4.0302 6.18284C4.51373 5.38299 5.03247 4.66212 5.57896 4.0239L4.81938 3.37349ZM3.17442 5.6655C2.84963 6.20276 2.54492 6.76554 2.26089 7.35067L3.16051 7.78735C3.43187 7.22831 3.72207 6.69255 4.0302 6.18284L3.17442 5.6655ZM0.870369 10.9052C0.504702 12.0898 0.208935 13.3294 -0.0129473 14.6065L0.972294 14.7776C1.18724 13.5404 1.47331 12.3423 1.82588 11.2001L0.870369 10.9052ZM-0.444668 18.3815C-0.480526 19.0102 -0.499119 19.6438 -0.5 20.2804L0.5 20.2818C0.500854 19.6637 0.518907 19.0486 0.553709 18.4384L-0.444668 18.3815ZM-0.5 20.2811V21.871H0.5V20.2811H-0.5ZM-0.5 25.0507V28.2304H0.5V25.0507H-0.5ZM-0.5 31.4101V33H0.5V31.4101H-0.5ZM-0.5 33V34.65H0.5V33H-0.5ZM-0.5 37.95V39.6H0.5V37.95H-0.5ZM-0.5 39.6V41.5692H0.5V39.6H-0.5ZM-0.5 45.5077V49.4462H0.5V45.5077H-0.5ZM-0.5 53.3846V57.3231H0.5V53.3846H-0.5ZM-0.5 61.2615V65.2H0.5V61.2615H-0.5ZM-0.5 69.1385V73.0769H0.5V69.1385H-0.5ZM-0.5 77.0154V80.9538H0.5V77.0154H-0.5ZM-0.5 84.8923V88.8308H0.5V84.8923H-0.5ZM-0.5 92.7692V96.7077H0.5V92.7692H-0.5ZM-0.5 100.646V104.585H0.5V100.646H-0.5ZM-0.5 108.523V112.462H0.5V108.523H-0.5ZM-0.5 116.4V120.338H0.5V116.4H-0.5ZM-0.5 124.277V128.215H0.5V124.277H-0.5ZM-0.5 132.154V136.092H0.5V132.154H-0.5ZM-0.5 140.031V142H0.5V140.031H-0.5ZM-0.5 142C-0.5 142.567 -0.444407 143.122 -0.338222 143.658L0.642766 143.464C0.549158 142.991 0.5 142.502 0.5 142H-0.5ZM0.931992 146.723C1.55242 147.65 2.35019 148.448 3.27691 149.068L3.83323 148.237C3.01513 147.689 2.31067 146.985 1.76296 146.167L0.931992 146.723ZM6.34167 150.338C6.87841 150.444 7.43296 150.5 8 150.5V149.5C7.49847 149.5 7.00891 149.451 6.53574 149.357L6.34167 150.338ZM8 150.5H10V149.5H8V150.5ZM14 150.5H18V149.5H14V150.5ZM22 150.5H26V149.5H22V150.5ZM30 150.5H34V149.5H30V150.5ZM38 150.5H42V149.5H38V150.5ZM46 150.5H50V149.5H46V150.5ZM54 150.5H58V149.5H54V150.5ZM62 150.5H66V149.5H62V150.5ZM70 150.5H74V149.5H70V150.5ZM78 150.5H82V149.5H78V150.5ZM86 150.5H90V149.5H86V150.5ZM94 150.5H98V149.5H94V150.5ZM102 150.5H106V149.5H102V150.5ZM110 150.5H114V149.5H110V150.5ZM118 150.5H122V149.5H118V150.5ZM126 150.5H130V149.5H126V150.5ZM134 150.5H138V149.5H134V150.5ZM142 150.5H146V149.5H142V150.5ZM150 150.5H154V149.5H150V150.5ZM158 150.5H162V149.5H158V150.5ZM166 150.5H170V149.5H166V150.5ZM174 150.5H178V149.5H174V150.5ZM182 150.5H186V149.5H182V150.5ZM190 150.5H194V149.5H190V150.5ZM198 150.5H202V149.5H198V150.5ZM206 150.5H208V149.5H206V150.5ZM208 150.5C208.567 150.5 209.122 150.444 209.658 150.338L209.464 149.357C208.991 149.451 208.502 149.5 208 149.5V150.5ZM212.723 149.068C213.65 148.448 214.448 147.65 215.068 146.723L214.237 146.167C213.689 146.985 212.985 147.689 212.167 148.237L212.723 149.068ZM216.338 143.658C216.444 143.122 216.5 142.567 216.5 142H215.5C215.5 142.502 215.451 142.991 215.357 143.464L216.338 143.658ZM216.5 142V140.058H215.5V142H216.5ZM216.5 136.173V132.288H215.5V136.173H216.5ZM216.5 128.404V124.519H215.5V128.404H216.5ZM216.5 120.635V116.75H215.5V120.635H216.5ZM216.5 112.865V108.981H215.5V112.865H216.5ZM216.5 105.096V101.212H215.5V105.096H216.5ZM216.5 97.3269V93.4423H215.5V97.3269H216.5ZM216.5 89.5577V85.6731H215.5V89.5577H216.5ZM216.5 81.7885V77.9038H215.5V81.7885H216.5ZM216.5 74.0192V70.1346H215.5V74.0192H216.5ZM216.5 66.25V62.3654H215.5V66.25H216.5ZM216.5 58.4808V54.5962H215.5V58.4808H216.5ZM216.5 50.7115V46.8269H215.5V50.7115H216.5ZM216.5 42.9423V41H215.5V42.9423H216.5ZM216.5 41C216.5 40.433 216.444 39.8784 216.338 39.3417L215.357 39.5357C215.451 40.0089 215.5 40.4985 215.5 41H216.5ZM215.068 36.2769C214.448 35.3502 213.65 34.5524 212.723 33.932L212.167 34.763C212.985 35.3107 213.689 36.0151 214.237 36.8332L215.068 36.2769ZM209.658 32.6618C209.122 32.5556 208.567 32.5 208 32.5V33.5C208.502 33.5 208.991 33.5492 209.464 33.6428L209.658 32.6618ZM208 32.5H205.802V33.5H208V32.5ZM201.407 32.5H197.011V33.5H201.407V32.5ZM192.616 32.5H188.22V33.5H192.616V32.5ZM183.824 32.5H179.429V33.5H183.824V32.5ZM175.033 32.5H172.836V33.5H175.033V32.5ZM172.836 32.5C172.089 32.5 171.35 32.4283 170.629 32.287L170.437 33.2683C171.221 33.4221 172.025 33.5 172.836 33.5V32.5ZM166.571 30.5916C165.97 30.1764 165.409 29.6957 164.902 29.1513L164.171 29.8332C164.728 30.4314 165.343 30.9592 166.003 31.4146L166.571 30.5916ZM164.902 29.1513C164.274 28.4779 163.639 27.7843 162.998 27.075L162.256 27.7455C162.9 28.4579 163.539 29.1554 164.171 29.8332L164.902 29.1513ZM159.254 22.8541C158.637 22.15 158.017 21.44 157.395 20.7274L156.642 21.3849C157.264 22.0974 157.884 22.8081 158.501 23.513L159.254 22.8541ZM157.395 20.7274C156.939 20.2044 156.481 19.68 156.023 19.1559L155.27 19.8142C155.728 20.3379 156.185 20.8619 156.642 21.3849L157.395 20.7274ZM153.264 16.0209C152.33 14.9688 151.395 13.9295 150.465 12.9154L149.728 13.5915C150.654 14.6005 151.584 15.6357 152.516 16.685L153.264 16.0209ZM147.596 9.8662C146.594 8.83207 145.6 7.84249 144.618 6.91388L143.931 7.64033C144.9 8.55705 145.884 9.53613 146.878 10.562L147.596 9.8662ZM141.47 4.12469C140.302 3.16877 139.156 2.32836 138.04 1.6361L137.513 2.48575C138.583 3.14957 139.693 3.96266 140.836 4.89853L141.47 4.12469ZM134.141 -0.169709C133.395 -0.377924 132.663 -0.490629 131.95 -0.490629V0.509371C132.558 0.509371 133.199 0.60548 133.872 0.793451L134.141 -0.169709ZM157.018 21.0562L156.265 21.7137V21.7137L157.018 21.0562ZM3.60231 5.92417L4.45809 6.44151L3.60231 5.92417ZM0 20.2811L-1 20.2797V20.2811H0ZM164.536 29.4923L165.268 28.8103L164.536 29.4923ZM12.2558 2.1698e-05L12.2582 -0.999975L12.2558 2.1698e-05ZM131.95 -0.990629H129.955V1.00937H131.95V-0.990629ZM125.966 -0.990629H121.976V1.00937H125.966V-0.990629ZM117.987 -0.990629H113.997V1.00937H117.987V-0.990629ZM110.008 -0.990629H106.018V1.00937H110.008V-0.990629ZM102.029 -0.990629H98.0393V1.00937H102.029V-0.990629ZM94.0499 -0.990629H90.0603V1.00937H94.0499V-0.990629ZM86.0708 -0.990629H82.0814V1.00937H86.0708V-0.990629ZM78.0919 -0.990629H74.1024V1.00937H78.0919V-0.990629ZM70.1129 -0.990629H66.1234V1.00937H70.1129V-0.990629ZM62.1339 -0.990629H58.1444V1.00937H62.1339V-0.990629ZM54.1549 -0.990629H50.1654V1.00937H54.1549V-0.990629ZM46.1759 -0.990629H42.1864V1.00937H46.1759V-0.990629ZM38.1969 -0.990629H34.2074V1.00937H38.1969V-0.990629ZM30.2179 -0.990629H26.2284V1.00937H30.2179V-0.990629ZM22.2389 -0.990629H18.2494V1.00937H22.2389V-0.990629ZM14.2599 -0.990629H12.2652V1.00937H14.2599V-0.990629ZM12.2652 -0.990629C12.3983 -0.990629 12.5277 -0.963951 12.6464 -0.914709L11.8803 0.932742C12.0002 0.982441 12.1308 1.00937 12.2652 1.00937V-0.990629ZM13.1846 -0.376568C13.2338 -0.257825 13.2605 -0.128419 13.2605 0.0046957H11.2605C11.2605 0.139078 11.2874 0.269693 11.3371 0.389539L13.1846 -0.376568ZM13.2605 0.0046957C13.2605 -0.12986 13.2335 -0.260534 13.1838 -0.380335L11.3365 0.386152C11.2872 0.267453 11.2605 0.137986 11.2605 0.0046957H13.2605ZM12.6422 -0.922713C12.5227 -0.972474 12.3924 -0.99965 12.2582 -0.999975L12.2534 1.00002C12.1204 0.999696 11.9914 0.972775 11.873 0.923473L12.6422 -0.922713ZM12.2582 -0.999975C11.2233 -1.00249 10.2055 -0.813235 9.22483 -0.449683L9.92004 1.4256C10.6876 1.14104 11.4688 0.998116 12.2534 1.00002L12.2582 -0.999975ZM4.43959 3.04829C3.83543 3.75386 3.26915 4.54233 2.74653 5.40683L4.45809 6.44151C4.9286 5.6632 5.43149 4.96487 5.95876 4.34911L4.43959 3.04829ZM2.74653 5.40683C2.41341 5.95786 2.10145 6.53415 1.81108 7.13233L3.61032 8.00569C3.87535 7.45969 4.15828 6.93745 4.45809 6.44151L2.74653 5.40683ZM0.392613 10.7577C0.0203984 11.9635 -0.280218 13.2238 -0.505568 14.5209L1.46491 14.8632C1.67639 13.646 1.95761 12.4686 2.30364 11.3476L0.392613 10.7577ZM-0.943857 18.353C-0.980242 18.991 -0.999106 19.6338 -0.999999 20.2797L0.999999 20.2825C1.00084 19.6737 1.01862 19.0679 1.0529 18.4669L-0.943857 18.353ZM-1 20.2811V21.871H1V20.2811H-1ZM-1 25.0507V28.2304H1V25.0507H-1ZM-1 31.4101V33H1V31.4101H-1ZM-1 33V34.65H1V33H-1ZM-1 37.95V39.6H1V37.95H-1ZM-1 39.6V41.5692H1V39.6H-1ZM-1 45.5077V49.4462H1V45.5077H-1ZM-1 53.3846V57.3231H1V53.3846H-1ZM-1 61.2615V65.2H1V61.2615H-1ZM-1 69.1385V73.0769H1V69.1385H-1ZM-1 77.0154V80.9538H1V77.0154H-1ZM-1 84.8923V88.8308H1V84.8923H-1ZM-1 92.7692V96.7077H1V92.7692H-1ZM-1 100.646V104.585H1V100.646H-1ZM-1 108.523V112.462H1V108.523H-1ZM-1 116.4V120.338H1V116.4H-1ZM-1 124.277V128.215H1V124.277H-1ZM-1 132.154V136.092H1V132.154H-1ZM-1 140.031V142H1V140.031H-1ZM-1 142C-1 142.6 -0.941189 143.187 -0.828716 143.755L1.13326 143.367C1.04594 142.926 1 142.469 1 142H-1ZM0.516508 147.001C1.17329 147.982 2.01772 148.827 2.99875 149.483L4.11139 147.822C3.3476 147.31 2.68979 146.652 2.17844 145.889L0.516508 147.001ZM6.24463 150.829C6.81317 150.941 7.40021 151 8 151V149C7.53122 149 7.07416 148.954 6.63277 148.867L6.24463 150.829ZM8 151H10V149H8V151ZM14 151H18V149H14V151ZM22 151H26V149H22V151ZM30 151H34V149H30V151ZM38 151H42V149H38V151ZM46 151H50V149H46V151ZM54 151H58V149H54V151ZM62 151H66V149H62V151ZM70 151H74V149H70V151ZM78 151H82V149H78V151ZM86 151H90V149H86V151ZM94 151H98V149H94V151ZM102 151H106V149H102V151ZM110 151H114V149H110V151ZM118 151H122V149H118V151ZM126 151H130V149H126V151ZM134 151H138V149H134V151ZM142 151H146V149H142V151ZM150 151H154V149H150V151ZM158 151H162V149H158V151ZM166 151H170V149H166V151ZM174 151H178V149H174V151ZM182 151H186V149H182V151ZM190 151H194V149H190V151ZM198 151H202V149H198V151ZM206 151H208V149H206V151ZM208 151C208.6 151 209.187 150.941 209.755 150.829L209.367 148.867C208.926 148.954 208.469 149 208 149V151ZM213.001 149.483C213.982 148.827 214.827 147.982 215.483 147.001L213.822 145.889C213.31 146.652 212.652 147.31 211.889 147.822L213.001 149.483ZM216.829 143.755C216.941 143.187 217 142.6 217 142H215C215 142.469 214.954 142.926 214.867 143.367L216.829 143.755ZM217 142V140.058H215V142H217ZM217 136.173V132.288H215V136.173H217ZM217 128.404V124.519H215V128.404H217ZM217 120.635V116.75H215V120.635H217ZM217 112.865V108.981H215V112.865H217ZM217 105.096V101.212H215V105.096H217ZM217 97.3269V93.4423H215V97.3269H217ZM217 89.5577V85.6731H215V89.5577H217ZM217 81.7885V77.9038H215V81.7885H217ZM217 74.0192V70.1346H215V74.0192H217ZM217 66.25V62.3654H215V66.25H217ZM217 58.4808V54.5962H215V58.4808H217ZM217 50.7115V46.8269H215V50.7115H217ZM217 42.9423V41H215V42.9423H217ZM217 41C217 40.4002 216.941 39.8132 216.829 39.2446L214.867 39.6328C214.954 40.0742 215 40.5312 215 41H217ZM215.483 35.9988C214.827 35.0177 213.982 34.1733 213.001 33.5165L211.889 35.1784C212.652 35.6898 213.31 36.3476 213.822 37.1114L215.483 35.9988ZM209.755 32.1713C209.187 32.0588 208.6 32 208 32V34C208.469 34 208.926 34.0459 209.367 34.1333L209.755 32.1713ZM208 32H205.802V34H208V32ZM201.407 32H197.011V34H201.407V32ZM192.616 32H188.22V34H192.616V32ZM183.824 32H179.429V34H183.824V32ZM175.033 32H172.836V34H175.033V32ZM172.836 32C172.121 32 171.414 31.9313 170.725 31.7963L170.34 33.759C171.157 33.919 171.993 34 172.836 34V32ZM166.855 30.18C166.283 29.785 165.75 29.3278 165.268 28.8103L163.805 30.1742C164.388 30.7992 165.03 31.3506 165.719 31.8261L166.855 30.18ZM165.268 28.8103C164.642 28.1392 164.009 27.4475 163.369 26.7397L161.885 28.0807C162.53 28.7947 163.171 29.4941 163.805 30.1742L165.268 28.8103ZM159.63 22.5246C159.013 21.8209 158.394 21.1112 157.772 20.3986L156.265 21.7137C156.887 22.4261 157.507 23.1371 158.125 23.8424L159.63 22.5246ZM157.772 20.3986C157.315 19.8756 156.858 19.3511 156.399 18.8268L154.894 20.1433C155.351 20.6668 155.809 21.1906 156.265 21.7137L157.772 20.3986ZM153.638 15.6889C152.702 14.6354 151.766 13.5939 150.833 12.5774L149.36 13.9295C150.283 14.936 151.212 15.9691 152.142 17.017L153.638 15.6889ZM147.955 9.51827C146.949 8.48004 145.95 7.48521 144.962 6.55065L143.588 8.00355C144.55 8.91433 145.529 9.88816 146.519 10.91L147.955 9.51827ZM141.786 3.73776C140.606 2.77182 139.442 1.91775 138.304 1.21128L137.249 2.91058C138.296 3.56018 139.388 4.35961 140.52 5.28545L141.786 3.73776ZM134.275 -0.651289C133.493 -0.869626 132.716 -0.990629 131.95 -0.990629V1.00937C132.505 1.00937 133.1 1.09718 133.737 1.27503L134.275 -0.651289Z"
        fill="#003F85"
        mask="url(#path-1-inside-1_369_9970)"
      />
    </svg>
  ) : (
    <svg
      width="240"
      height="174"
      viewBox="0 0 240 174"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="bg"
    >
      <g filter="url(#filter0_d_586_4410)">
        <path
          d="M143.95 8.00781C156.644 8.00781 178.96 40.1592 190 41H12V24.9009C12.0075 20.4096 13.3032 16.1061 15.6023 12.9368C17.9014 9.7675 21.0157 7.99176 24.2605 8.00003V8.00781H143.95Z"
          fill="white"
        />
        <path
          d="M12 41H220C224.418 41 228 44.5817 228 49V150C228 154.418 224.418 158 220 158H20C15.5817 158 12 154.418 12 150V41Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_586_4410"
          x="0"
          y="0"
          width="240"
          height="174"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood
            floodOpacity="0"
            result="BackgroundImageFix"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="6" />
          <feComposite
            in2="hardAlpha"
            operator="out"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_586_4410"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_586_4410"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );

interface Props {
  isAdd?: boolean;
  title?: string;
  archived?: boolean;
  published?: boolean;
}

const Folder: React.FC<Props> = ({ isAdd = false, title, archived, published }) => {
  const { t } = useTranslation();
  const [menuOpened, setMenuOpened] = useState<boolean>(false);

  const [modalCreateFolder, setModalCreateFolder] = useState<boolean>(false);
  const [modalEditFolder, setModalEditFolder] = useState<boolean>(false);
  const [modalPublishFolder, setModalPublishFolder] = useState<boolean>(false);
  const [modalUnublishFolder, setModalUnublishFolder] = useState<boolean>(false);
  const [modalArchiveFolder, setModalArchiveFolder] = useState<boolean>(false);

  const [modalDeleteFolder, setModalDeleteFolder] = useState<boolean>(false);

  return (
    <>
      <FolderWrapper className={archived ? "archived" : ""}>
        {isAdd && (
          <div
            className="add-wrapper"
            onClick={() => setModalCreateFolder(true)}
          >
            <IconPlus />
            <span className="text-add">{t("pages.home.add")}</span>
          </div>
        )}
        <div className={`bg-wrapper${!isAdd ? " default" : ""}`}>
          {renderBackground(isAdd)}
          {!isAdd && (
            <>
              <div className="img-wrapper">
                <img
                  src={iconMap}
                  alt="icon"
                />
              </div>
              <div className="menu-wrapper">
                <IconButton
                  className={`btn-menu${menuOpened ? " active" : ""}`}
                  onClick={() => setMenuOpened(!menuOpened)}
                >
                  <IconDots />
                </IconButton>
                {menuOpened && (
                  <div className="sub-menu">
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        setModalEditFolder(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t("common.change")}
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        published ? setModalUnublishFolder(true) : setModalPublishFolder(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t(`common.${published ? "removeFromPublish" : "publish"}`)}
                    </Button>
                    <Button
                      variant="text"
                      color="primary"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        setModalArchiveFolder(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t("common.archive")}
                    </Button>
                    <Button
                      variant="text"
                      color="error"
                      size="small"
                      sx={{ borderRadius: 0 }}
                      onClick={() => {
                        setModalDeleteFolder(true);
                        setMenuOpened(false);
                      }}
                    >
                      {t("common.delete")}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <div className="content">{!isAdd && <span>Услуги от България</span>}</div>
      </FolderWrapper>

      {modalCreateFolder && (
        <Modal
          title={t("pages.category.addFolder")}
          closeFn={() => setModalCreateFolder(false)}
        >
          <>
            <AddFolder closeFn={() => setModalCreateFolder(false)} />
          </>
        </Modal>
      )}
      {modalEditFolder && (
        <Modal
          title={t("pages.category.changeFolder")}
          closeFn={() => setModalEditFolder(false)}
        >
          <>
            <EditFolder closeFn={() => setModalEditFolder(false)} />
            {/* <Loader showExplicit inModal /> */}
          </>
        </Modal>
      )}
      {modalArchiveFolder && (
        <Modal
          closeFn={() => {
            setModalArchiveFolder(false);
          }}
        >
          <ArchiveFolder
            closeFn={() => {
              setModalArchiveFolder(false);
            }}
            folderForArchive={"asd"}
          />
        </Modal>
      )}
      {modalPublishFolder && (
        <Modal
          closeFn={() => {
            setModalPublishFolder(false);
          }}
          title={t("pages.category.confirmPublish")}
          large
        >
          <PublishFolder
            closeFn={() => {
              setModalPublishFolder(false);
            }}
            // folderForArchive={"sda"}
          />
        </Modal>
      )}
      {modalUnublishFolder && (
        <Modal
          closeFn={() => {
            setModalUnublishFolder(false);
          }}
        >
          <UnpublishFolder
            closeFn={() => {
              setModalUnublishFolder(false);
            }}
            folder={""}
          />
        </Modal>
      )}
      {modalDeleteFolder && (
        <Modal
          closeFn={() => {
            setModalDeleteFolder(false);
          }}
        >
          <DeleteFolder
            closeFn={() => {
              setModalDeleteFolder(false);
            }}
            folder={"Забравени предмети"}
          />
        </Modal>
      )}
    </>
  );
};

export default Folder;
