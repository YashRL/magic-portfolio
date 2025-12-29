"use client";

import {
  AvatarGroup,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
} from "@once-ui-system/core";
import { useEffect, useState } from "react";
import Slider from "react-slick"; 
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  href?: string;
  images: string[];
  title?: string;
  content?: string;
  description?: string;
  avatars?: { src: string }[];
  link?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars,
  link,
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: false,
  };

  // Make arrows visible + white
  useEffect(() => {
    const arrows = document.querySelectorAll(".slick-prev, .slick-next");
    arrows.forEach((arrow) => {
      const el = arrow as HTMLElement;
      el.style.display = "block";
      el.style.zIndex = "10";
    });

    const icons = document.querySelectorAll(
      ".slick-prev:before, .slick-next:before"
    );
    icons.forEach((icon) => {
      (icon as HTMLElement).style.color = "#fff";
      (icon as HTMLElement).style.fontSize = "24px";
    });
  }, []);

  // Close modal on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Column fillWidth gap="m">
      {/* IMAGE SLIDER */}
      <Flex
        style={{
          height: "320px",
          borderRadius: "12px",
          background: "#0b0b0b",
          overflow: "visible",
        }}
      >
        <Slider {...settings} className={styles["project-image-slider"]}>
          {images.map((image, index) => (
            <div key={index}>
              <div
                style={{
                  height: "320px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={image}
                  alt={title}
                  onClick={() => setActiveImage(image)}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    cursor: "zoom-in",
                  }}
                />
              </div>
            </div>
          ))}
        </Slider>
      </Flex>

      {/* CONTENT */}
      <Flex
        s={{ direction: "column" }}
        fillWidth
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Heading as="h2" wrap="balance" variant="heading-strong-xl">
            {title}
          </Heading>
        )}

        {avatars && (avatars?.length > 0 || description?.trim() || content?.trim()) && (
          <Column gap="16">
            {avatars?.length > 0 && (
              <AvatarGroup avatars={avatars} size="m" reverse />
            )}

            {description?.trim() && (
              <Text wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}

            <Flex gap="24" wrap>
              {content?.trim() && (
                <SmartLink
                  suffixIcon="arrowRight"
                  href={href}
                  style={{ width: "fit-content" }}
                >
                  <Text variant="body-default-s">Read case study</Text>
                </SmartLink>
              )}

              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  href={link}
                  style={{ width: "fit-content" }}
                >
                  <Text variant="body-default-s">View project</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>

      {/* FULLSCREEN MODAL */}
      {activeImage && (
        <Flex
          onClick={() => setActiveImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <img
            src={activeImage}
            alt="Full view"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
            }}
          />
        </Flex>
      )}
    </Column>
  );
};
