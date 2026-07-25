import { learningPaths } from "@/data/learning-paths";
import { lessonsForPath } from "@/data/lessons";
import type { Choice, Question, VocabularyItem } from "@/types/skillquest";

const rawQuestions: Question[] = [
  {
    id: "img-ux-checkout-stock",
    learningPath: "UX/UI Design",
    skill: "UX Diagnosis",
    skillTh: "การวิเคราะห์ปัญหา UX",
    topic: "Checkout Error State",
    topicTh: "สถานะผิดพลาดในขั้นตอนชำระเงิน",
    difficulty: "Junior",
    question:
      "Look at the checkout screen. What is the primary UX problem the team should solve first?",
    questionTh:
      "ดูหน้าชำระเงินนี้ ปัญหา UX หลักที่ทีมควรแก้ก่อนคืออะไร?",
    media: {
      type: "single-image",
      displayMode: "contain",
      allowZoom: true,
      images: [
        {
          id: "checkout-stock-state",
          src: "/quiz-images/ux-checkout-stock-state.svg",
          altEn: "A checkout UI where the payment area shows an out-of-stock warning after the user has reached the final step.",
          altTh: "หน้าชำระเงินที่แสดงคำเตือนสินค้าหมดเมื่อผู้ใช้มาถึงขั้นตอนสุดท้ายแล้ว",
          captionEn: "The user is asked to pay, but the item becomes unavailable at the final step.",
          captionTh: "ผู้ใช้กำลังจะจ่ายเงิน แต่เพิ่งรู้ว่าสินค้าหมดในขั้นตอนสุดท้าย",
          label: "Checkout screen",
          width: 960,
          height: 620,
        },
      ],
    },
    choices: [
      { id: "a", text: "Make the warning redder so users notice it faster.", textTh: "ทำคำเตือนให้แดงขึ้นเพื่อให้ผู้ใช้เห็นเร็วขึ้น" },
      { id: "b", text: "Validate stock earlier in the cart or product flow.", textTh: "ตรวจสอบสต็อกตั้งแต่ใน cart หรือก่อนถึงขั้นจ่ายเงิน" },
      { id: "c", text: "Remove the product image to reduce distraction.", textTh: "เอารูปสินค้าออกเพื่อลดสิ่งรบกวน" },
      { id: "d", text: "Hide the price until payment succeeds.", textTh: "ซ่อนราคาจนกว่าการชำระเงินจะสำเร็จ" },
    ],
    correctChoiceId: "b",
    explanation:
      "The visual problem is not only the warning style. The flow lets users invest effort before discovering a blocking stock issue.",
    explanationTh:
      "ปัญหาไม่ได้อยู่แค่สีของคำเตือน แต่ flow ปล่อยให้ผู้ใช้ลงทุนลงแรงมาถึงจุดสำคัญก่อนจึงพบว่าสินค้าหมด",
    incorrectFeedback: {
      a: "A stronger warning may improve visibility, but it still leaves the failure too late in the journey.",
      c: "The product image is not the cause of the blocked checkout.",
      d: "Hiding price information would make the experience less transparent.",
    },
    incorrectFeedbackTh: {
      a: "คำเตือนที่เด่นขึ้นอาจช่วยให้เห็นง่าย แต่ยังไม่แก้ปัญหาที่เจอช้าเกินไป",
      c: "รูปสินค้าไม่ได้เป็นต้นเหตุของ checkout ที่ถูกบล็อก",
      d: "การซ่อนราคาจะทำให้ประสบการณ์ไม่โปร่งใสและน่าไม่มั่นใจ",
    },
    practicalExample:
      "A cart can re-check availability when the item is added and again before the user enters payment details.",
    practicalExampleTh:
      "Cart สามารถตรวจสต็อกตอนเพิ่มสินค้า และตรวจซ้ำก่อนให้ผู้ใช้กรอกข้อมูลชำระเงิน",
    keyTakeaway: "Fix the journey timing before polishing the error state.",
    keyTakeawayTh: "แก้จังหวะของ flow ก่อนปรับความสวยของ error state",
    hint: "Ask where the product could have prevented the surprise.",
    hintTh: "ลองถามว่าระบบควรป้องกันความประหลาดใจนี้ได้ตั้งแต่จุดไหน",
    vocabulary: [
      {
        id: "vocab-error-state",
        word: "Error state",
        thaiMeaning: "สถานะของหน้าจอเมื่อเกิดปัญหาที่ผู้ใช้ต้องรับรู้หรือแก้ไข",
        partOfSpeech: "noun",
        simpleDefinition: "A UI state that explains a problem and helps the user recover.",
        exampleSentence: "A good error state appears at the right moment.",
        exampleTranslationTh: "Error state ที่ดีควรปรากฏในจังหวะที่เหมาะสม",
        skill: "UX Diagnosis",
        topic: "Checkout Error State",
      },
    ],
  },
  {
    id: "img-ux-writing-error",
    learningPath: "UX Writing",
    skill: "Error Microcopy",
    skillTh: "ข้อความ error ใน UI",
    topic: "Recovery Copy",
    topicTh: "ข้อความที่ช่วยให้ผู้ใช้แก้ปัญหา",
    difficulty: "Junior",
    question:
      "The image compares two error message versions. Which version is stronger for helping the user recover?",
    questionTh:
      "ภาพนี้เปรียบเทียบข้อความ error สองแบบ แบบใดช่วยให้ผู้ใช้แก้ปัญหาได้ดีกว่า?",
    media: {
      type: "single-image",
      displayMode: "contain",
      allowZoom: true,
      images: [
        {
          id: "error-message-comparison",
          src: "/quiz-images/ux-writing-error-message.svg",
          altEn: "Two UI cards compare Version A with a vague error message and Version B with a specific recovery instruction.",
          altTh: "การ์ด UI สองใบเปรียบเทียบ Version A ที่ข้อความกว้างเกินไปกับ Version B ที่บอกวิธีแก้ชัดเจน",
          captionEn: "Version A names the problem vaguely. Version B explains what to do next.",
          captionTh: "Version A บอกปัญหาแบบกว้าง ๆ ส่วน Version B บอกขั้นตอนถัดไปชัดกว่า",
          label: "Copy comparison",
          width: 960,
          height: 540,
        },
      ],
    },
    choices: [
      { id: "a", text: "Version A, because it is shorter.", textTh: "Version A เพราะสั้นกว่า" },
      { id: "b", text: "Version B, because it gives a specific next action.", textTh: "Version B เพราะบอกสิ่งที่ควรทำต่ออย่างเฉพาะเจาะจง" },
      { id: "c", text: "Version A, because vague copy feels more premium.", textTh: "Version A เพราะข้อความกว้าง ๆ ดูพรีเมียมกว่า" },
      { id: "d", text: "Neither version should show an error.", textTh: "ไม่ควรแสดง error ทั้งสองแบบ" },
    ],
    correctChoiceId: "b",
    explanation:
      "Version B is stronger because it gives the user a concrete recovery action instead of leaving them to guess.",
    explanationTh:
      "Version B ดีกว่าเพราะให้ทางแก้ที่ชัดเจน ผู้ใช้ไม่ต้องเดาเองว่าต้องทำอะไรต่อ",
    incorrectFeedback: {
      a: "Short copy is useful only when it remains clear and helpful.",
      c: "Premium UX writing should still be specific and useful.",
      d: "Hiding errors makes recovery harder.",
    },
    incorrectFeedbackTh: {
      a: "ข้อความสั้นจะดีเมื่อยังชัดเจนและช่วยผู้ใช้ได้",
      c: "ข้อความที่ดูพรีเมียมก็ยังต้องเฉพาะเจาะจงและใช้งานได้จริง",
      d: "การซ่อน error ทำให้ผู้ใช้แก้ปัญหายากขึ้น",
    },
    practicalExample:
      "Instead of “Payment failed,” write “Check your card number or choose another payment method.”",
    practicalExampleTh:
      "แทนที่จะเขียนว่า “ชำระเงินไม่สำเร็จ” ให้เขียนว่า “ตรวจเลขบัตร หรือเลือกวิธีชำระเงินอื่น”",
    keyTakeaway: "Helpful error copy pairs the problem with a recovery action.",
    keyTakeawayTh: "Error copy ที่ดีควรบอกทั้งปัญหาและวิธีไปต่อ",
    hint: "Look for the version that lowers guessing.",
    hintTh: "เลือกแบบที่ทำให้ผู้ใช้เดาน้อยที่สุด",
  },
  {
    id: "img-graphic-hierarchy",
    learningPath: "Graphic Design",
    skill: "Visual Hierarchy",
    skillTh: "ลำดับความสำคัญทางสายตา",
    topic: "Layout Critique",
    topicTh: "การวิจารณ์ layout",
    difficulty: "Junior",
    question:
      "Review the poster layout. What visual hierarchy issue is most likely to slow down reading?",
    questionTh:
      "ดู layout โปสเตอร์นี้ ปัญหา visual hierarchy ใดน่าจะทำให้อ่านช้าลงที่สุด?",
    media: {
      type: "single-image",
      displayMode: "contain",
      allowZoom: true,
      images: [
        {
          id: "hierarchy-layout",
          src: "/quiz-images/visual-hierarchy-layout.svg",
          altEn: "A poster layout with several similarly weighted text blocks and no clear primary focal point.",
          altTh: "layout โปสเตอร์ที่มีบล็อกข้อความน้ำหนักใกล้กันหลายส่วน และไม่มีจุดเด่นหลักที่ชัดเจน",
          captionEn: "Several elements compete for attention with similar size, weight, and spacing.",
          captionTh: "หลายองค์ประกอบแย่งความสนใจ เพราะขนาด น้ำหนัก และระยะห่างใกล้กันเกินไป",
          label: "Poster layout",
          width: 960,
          height: 620,
        },
      ],
    },
    choices: [
      { id: "a", text: "Too many elements have similar visual weight.", textTh: "องค์ประกอบหลายชิ้นมีน้ำหนักทางสายตาใกล้กันเกินไป" },
      { id: "b", text: "The layout uses a dark background.", textTh: "layout ใช้พื้นหลังสีเข้ม" },
      { id: "c", text: "The margins are too consistent.", textTh: "ระยะ margin สม่ำเสมอเกินไป" },
      { id: "d", text: "The design should use more decorative shapes.", textTh: "ควรเพิ่มรูปทรงตกแต่งให้มากขึ้น" },
    ],
    correctChoiceId: "a",
    explanation:
      "When headline, supporting content, and call-to-action look equally important, the viewer cannot scan the message quickly.",
    explanationTh:
      "เมื่อ headline เนื้อหาเสริม และ call-to-action ดูสำคัญพอ ๆ กัน ผู้ชมจะสแกนข้อความได้ช้าลง",
    incorrectFeedback: {
      b: "A dark background can work if contrast and hierarchy are clear.",
      c: "Consistent margins usually support readability.",
      d: "More decoration could add noise without solving hierarchy.",
    },
    incorrectFeedbackTh: {
      b: "พื้นหลังเข้มใช้ได้ ถ้า contrast และ hierarchy ชัดเจน",
      c: "margin ที่สม่ำเสมอมักช่วยให้อ่านง่ายขึ้น",
      d: "การตกแต่งเพิ่มอาจทำให้รกขึ้นโดยไม่แก้ hierarchy",
    },
    practicalExample:
      "Increase the headline scale, reduce secondary text weight, and give the CTA a clearer position.",
    practicalExampleTh:
      "เพิ่มขนาด headline ลดน้ำหนักข้อความรอง และวาง CTA ให้เป็นจุดหมายที่ชัดขึ้น",
    keyTakeaway: "Good hierarchy tells the eye what to read first, second, and next.",
    keyTakeawayTh: "Hierarchy ที่ดีบอกสายตาว่าควรอ่านอะไรก่อน หลัง และต่อไป",
    hint: "Squint at the layout and ask what wins first.",
    hintTh: "ลองหรี่ตาดู แล้วถามว่าอะไรเด่นขึ้นมาก่อน",
  },
  {
    id: "img-art-direction-moodboards",
    learningPath: "Art Direction",
    skill: "Moodboard Evaluation",
    skillTh: "การประเมิน moodboard",
    topic: "Brand Direction",
    topicTh: "ทิศทางภาพลักษณ์แบรนด์",
    difficulty: "Mid-level",
    question:
      "A premium learning app wants to feel calm, modern, and focused. Which moodboard fits the direction better?",
    questionTh:
      "แอปเรียนรู้พรีเมียมต้องการความรู้สึก calm, modern และ focused moodboard ใดเหมาะกว่ากัน?",
    media: {
      type: "image-comparison",
      displayMode: "cover",
      allowZoom: true,
      images: [
        {
          id: "moodboard-a",
          src: "/quiz-images/art-direction-moodboard-a.svg",
          altEn: "Moodboard A with warm tan and orange editorial blocks.",
          altTh: "Moodboard A ใช้โทนอุ่น สีแทนและส้มแบบ editorial",
          captionEn: "Moodboard A feels warm and editorial, but less focused for a cool learning interface.",
          captionTh: "Moodboard A อบอุ่นและ editorial แต่ยังไม่ค่อยตรงกับแอปเรียนรู้โทน cool และมีสมาธิ",
          label: "A",
          width: 720,
          height: 520,
        },
        {
          id: "moodboard-b",
          src: "/quiz-images/art-direction-moodboard-b.svg",
          altEn: "Moodboard B with dark surfaces, cool blue, cyan, and violet accents.",
          altTh: "Moodboard B ใช้พื้นเข้ม พร้อม accent สีฟ้า cyan และ violet",
          captionEn: "Moodboard B uses cool contrast and restrained gradients that support a focused premium feel.",
          captionTh: "Moodboard B ใช้ contrast โทนเย็นและ gradient แบบพอดี ช่วยให้รู้สึกพรีเมียมและโฟกัส",
          label: "B",
          width: 720,
          height: 520,
        },
      ],
    },
    choices: [
      { id: "a", text: "Moodboard A, because warm colors always feel more premium.", textTh: "Moodboard A เพราะสีโทนอุ่นดูพรีเมียมกว่าเสมอ" },
      { id: "b", text: "Moodboard B, because the cool palette and contrast fit focused learning.", textTh: "Moodboard B เพราะ palette โทนเย็นและ contrast เข้ากับการเรียนแบบโฟกัส" },
      { id: "c", text: "Both equally, because moodboards do not affect product feel.", textTh: "เหมาะเท่ากัน เพราะ moodboard ไม่ส่งผลต่อความรู้สึกของ product" },
      { id: "d", text: "Neither, because learning apps should look childish.", textTh: "ไม่เหมาะทั้งคู่ เพราะแอปเรียนควรดูเด็ก ๆ" },
    ],
    correctChoiceId: "b",
    explanation:
      "Moodboard B aligns better with the brief: cool, premium, restrained, and suited to a modern learning product.",
    explanationTh:
      "Moodboard B ตรง brief มากกว่า เพราะดู cool, premium, restrained และเหมาะกับผลิตภัณฑ์การเรียนรู้สมัยใหม่",
    incorrectFeedback: {
      a: "Warm colors can be premium, but they do not match this specific cool and focused direction as well.",
      c: "Moodboards shape color, texture, rhythm, and emotional expectations.",
      d: "This brief explicitly asks for professional and creative, not childish.",
    },
    incorrectFeedbackTh: {
      a: "สีอุ่นดูพรีเมียมได้ แต่ไม่ตรงกับทิศทาง cool และ focused เท่าอีกแบบ",
      c: "Moodboard มีผลต่อสี texture จังหวะ และความคาดหวังทางอารมณ์",
      d: "brief นี้ต้องการความ professional และ creative ไม่ใช่ childish",
    },
    practicalExample:
      "Use Moodboard B as a base, then keep gradients subtle so learning content stays readable.",
    practicalExampleTh:
      "ใช้ Moodboard B เป็นฐาน แล้วควบคุม gradient ให้พอดี เพื่อให้เนื้อหาการเรียนยังอ่านง่าย",
    keyTakeaway: "Art direction should translate the product promise into visual behavior.",
    keyTakeawayTh: "Art direction ควรแปลง promise ของ product ให้เป็นพฤติกรรมทางภาพที่จับต้องได้",
    hint: "Match the moodboard to the words in the brief.",
    hintTh: "จับคู่ moodboard กับคำสำคัญใน brief",
  },
  {
    id: "img-creative-campaign",
    learningPath: "Creative Thinking",
    skill: "Concept Evaluation",
    skillTh: "การประเมิน concept",
    topic: "Campaign Insight",
    topicTh: "insight สำหรับแคมเปญ",
    difficulty: "Junior",
    question:
      "The visual concept shows ideas becoming clearer through practice. What makes this a stronger campaign direction?",
    questionTh:
      "ภาพ concept นี้สื่อว่าไอเดียชัดขึ้นได้ผ่านการฝึกฝน อะไรทำให้ทิศทางแคมเปญนี้แข็งแรงกว่า?",
    media: {
      type: "single-image",
      displayMode: "contain",
      allowZoom: true,
      images: [
        {
          id: "creative-campaign-insight",
          src: "/quiz-images/creative-campaign-insight.svg",
          altEn: "A campaign board showing scattered idea fragments organizing into a clear focused concept.",
          altTh: "บอร์ดแคมเปญที่แสดงเศษไอเดียกระจัดกระจายค่อย ๆ จัดเรียงเป็น concept ที่ชัดขึ้น",
          captionEn: "The concept turns practice into a visible transformation from scattered thoughts to clear direction.",
          captionTh: "concept นี้ทำให้การฝึกฝนกลายเป็นภาพที่เห็นได้ จากความคิดกระจัดกระจายสู่ทิศทางที่ชัดเจน",
          label: "Campaign concept",
          width: 960,
          height: 600,
        },
      ],
    },
    choices: [
      { id: "a", text: "It expresses a learner tension visually, not just a generic benefit.", textTh: "มันสื่อ tension ของผู้เรียนผ่านภาพ ไม่ใช่แค่บอก benefit กว้าง ๆ" },
      { id: "b", text: "It uses many random shapes, so it must be creative.", textTh: "มีรูปทรงเยอะ แปลว่าต้อง creative" },
      { id: "c", text: "It avoids showing any learning transformation.", textTh: "มันหลีกเลี่ยงการแสดงการเปลี่ยนแปลงจากการเรียนรู้" },
      { id: "d", text: "It would work for any product without changes.", textTh: "มันใช้ได้กับทุก product โดยไม่ต้องปรับอะไร" },
    ],
    correctChoiceId: "a",
    explanation:
      "The visual connects to a real learning feeling: uncertainty becoming clearer through repeated practice.",
    explanationTh:
      "ภาพเชื่อมกับความรู้สึกจริงของการเรียน คือจากความไม่แน่ใจค่อย ๆ ชัดขึ้นผ่านการฝึกซ้ำ",
    incorrectFeedback: {
      b: "Random shapes alone do not create a strategic idea.",
      c: "The transformation is exactly what gives the concept meaning.",
      d: "A concept that works for everything usually feels generic.",
    },
    incorrectFeedbackTh: {
      b: "รูปทรงเยอะอย่างเดียวไม่ได้ทำให้เกิด idea เชิงกลยุทธ์",
      c: "การเปลี่ยนแปลงนี่แหละคือสิ่งที่ทำให้ concept มีความหมาย",
      d: "concept ที่ใช้ได้กับทุกอย่างมักจะกว้างเกินไป",
    },
    practicalExample:
      "A Professor Mission campaign could show messy first attempts becoming sharper after feedback and review.",
    practicalExampleTh:
      "แคมเปญของ Professor Mission อาจโชว์งานแรกที่ยังยุ่ง ๆ ค่อย ๆ ชัดขึ้นหลัง feedback และการทบทวน",
    keyTakeaway: "Strong concepts make an insight visible and memorable.",
    keyTakeawayTh: "concept ที่แข็งแรงทำให้ insight มองเห็นและจดจำได้",
    hint: "Look for the answer that connects image, emotion, and product value.",
    hintTh: "เลือกคำตอบที่เชื่อมภาพ อารมณ์ และคุณค่าของ product เข้าด้วยกัน",
  },
  {
    id: "img-ielts-chart",
    learningPath: "IELTS Preparation",
    skill: "Writing Task 1",
    skillTh: "การเขียน IELTS Task 1",
    topic: "Chart Overview",
    topicTh: "การสรุปภาพรวมของกราฟ",
    difficulty: "B2",
    question:
      "Look at the bar chart. Which sentence is the best IELTS Academic Task 1 overview?",
    questionTh:
      "ดูกราฟแท่งนี้ ประโยคใดเป็น overview สำหรับ IELTS Academic Task 1 ที่ดีที่สุด?",
    media: {
      type: "single-image",
      displayMode: "contain",
      allowZoom: true,
      images: [
        {
          id: "ielts-bar-chart",
          src: "/quiz-images/ielts-bar-chart-practice.svg",
          altEn: "A bar chart titled Weekly study hours by skill comparing UX, writing, speaking, reading, and review.",
          altTh: "กราฟแท่งชื่อ Weekly study hours by skill เปรียบเทียบชั่วโมงเรียนของ UX writing speaking reading และ review",
          captionEn: "Original practice chart for IELTS overview writing.",
          captionTh: "กราฟตัวอย่างที่สร้างขึ้นสำหรับฝึกเขียน overview ใน IELTS",
          label: "Task 1 chart",
          width: 960,
          height: 620,
        },
      ],
    },
    choices: [
      { id: "a", text: "Overall, UX and writing received the most study time, while review took the least.", textTh: "โดยรวม UX และ writing ใช้เวลาเรียนมากที่สุด ขณะที่ review ใช้เวลาน้อยที่สุด" },
      { id: "b", text: "The chart is beautiful and uses five colors.", textTh: "กราฟนี้สวยและใช้สีทั้งหมดห้าสี" },
      { id: "c", text: "UX was exactly 100 hours and review was almost zero.", textTh: "UX มี 100 ชั่วโมงพอดี และ review เกือบเป็นศูนย์" },
      { id: "d", text: "I think studying is very important for everyone.", textTh: "ฉันคิดว่าการเรียนสำคัญมากสำหรับทุกคน" },
    ],
    correctChoiceId: "a",
    explanation:
      "A strong overview summarizes the main pattern without listing every number or adding personal opinion.",
    explanationTh:
      "overview ที่ดีสรุป pattern หลักของกราฟ โดยไม่ต้องไล่ตัวเลขทุกตัวหรือใส่ความคิดเห็นส่วนตัว",
    incorrectFeedback: {
      b: "IELTS Task 1 should describe data, not visual style.",
      c: "This invents exact values that are not supported by the chart.",
      d: "Personal opinion belongs in Task 2, not Academic Task 1.",
    },
    incorrectFeedbackTh: {
      b: "IELTS Task 1 ควรอธิบายข้อมูล ไม่ใช่วิจารณ์ความสวยของกราฟ",
      c: "ตัวเลือกนี้แต่งตัวเลขที่กราฟไม่ได้สนับสนุน",
      d: "ความคิดเห็นส่วนตัวเหมาะกับ Task 2 ไม่ใช่ Academic Task 1",
    },
    practicalExample:
      "Before writing details, identify the highest categories, lowest category, and any broad contrast.",
    practicalExampleTh:
      "ก่อนเขียนรายละเอียด ให้หา category ที่สูงสุด ต่ำสุด และความแตกต่างภาพรวมก่อน",
    keyTakeaway: "An IELTS overview reports the biggest trend, not every detail.",
    keyTakeawayTh: "overview ของ IELTS ต้องเล่าแนวโน้มใหญ่ ไม่ใช่รายละเอียดทุกจุด",
    hint: "Choose the sentence that summarizes the data pattern neutrally.",
    hintTh: "เลือกประโยคที่สรุป pattern ของข้อมูลอย่างเป็นกลาง",
  },
  {
    id: "ux-01",
    learningPath: "UX/UI Design",
    skill: "User Flow",
    topic: "Checkout Flow",
    difficulty: "Junior",
    question:
      "A user reaches the payment page and only then discovers that the product is out of stock. What should the product team improve first?",
    choices: [
      { id: "a", text: "Add a brighter out-of-stock message on the payment page." },
      { id: "b", text: "Check product availability before the user reaches payment." },
      { id: "c", text: "Ask the user to refresh the page before paying." },
      { id: "d", text: "Hide unavailable products from order history." },
    ],
    correctChoiceId: "b",
    explanation:
      "Availability should be validated earlier in the flow so users do not discover a blocking problem at the highest-friction moment.",
    incorrectFeedback: {
      a: "A clearer message helps after the failure, but it does not prevent the avoidable frustration.",
      c: "Refreshing shifts responsibility to the user instead of improving the flow.",
      d: "Order history does not affect the checkout failure.",
    },
    practicalExample:
      "An e-commerce cart can validate stock when the cart opens and again immediately before creating the order.",
    keyTakeaway: "Prevent predictable errors before users reach a critical step.",
    hint: "Think about the earliest moment the product can detect the problem.",
  },
  {
    id: "ux-02",
    learningPath: "UX/UI Design",
    skill: "Interaction Design",
    topic: "Form UX",
    difficulty: "Beginner",
    question:
      "A signup form says “Something went wrong” after submission, but the email field is invalid. What is the best UX improvement?",
    choices: [
      { id: "a", text: "Show the error next to the email field with a clear fix." },
      { id: "b", text: "Add a loading spinner for longer." },
      { id: "c", text: "Move the form lower on the page." },
      { id: "d", text: "Use a red background behind the whole screen." },
    ],
    correctChoiceId: "a",
    explanation:
      "Field-level errors help the user understand what happened and how to recover without scanning the entire page.",
    incorrectFeedback: {
      b: "A longer spinner does not clarify the problem.",
      c: "Changing position does not improve error recovery.",
      d: "A full red screen is alarming and still lacks a specific fix.",
    },
    practicalExample:
      "Show “Enter a valid email address, like name@example.com” under the email input.",
    keyTakeaway: "Good errors explain the problem and the next action.",
    hint: "The best answer helps the user recover immediately.",
  },
  {
    id: "ux-03",
    learningPath: "UX/UI Design",
    skill: "Information Architecture",
    topic: "Navigation",
    difficulty: "Mid-level",
    question:
      "Analytics show users often open Settings when trying to manage invoices. What should you investigate first?",
    choices: [
      { id: "a", text: "Whether invoice management is labeled and grouped where users expect it." },
      { id: "b", text: "Whether Settings needs a more colorful icon." },
      { id: "c", text: "Whether users should receive fewer invoices." },
      { id: "d", text: "Whether the dashboard should remove navigation." },
    ],
    correctChoiceId: "a",
    explanation:
      "The behavior suggests a mismatch between the user's mental model and the product's navigation structure.",
    incorrectFeedback: {
      b: "Icon styling may help recognition, but the first issue is findability and labeling.",
      c: "Invoice volume is unrelated to navigation confusion.",
      d: "Removing navigation would make discovery harder.",
    },
    practicalExample:
      "A billing area might need labels like “Invoices,” “Plans,” and “Payment methods” instead of hiding all items under Settings.",
    keyTakeaway: "Navigation problems often reveal mismatched mental models.",
    hint: "Look for the reason users choose the wrong destination.",
  },
  {
    id: "creative-01",
    learningPath: "Creative Thinking",
    skill: "Idea Generation",
    topic: "Customer Insight",
    difficulty: "Junior",
    question:
      "A brief says busy freelancers avoid accounting tools because they feel complicated. Which concept best uses the insight?",
    choices: [
      { id: "a", text: "A campaign showing dozens of advanced finance features." },
      { id: "b", text: "A concept around “finish your books before your coffee gets cold.”" },
      { id: "c", text: "A generic claim that the tool is innovative." },
      { id: "d", text: "A visual full of tax documents and calculator icons." },
    ],
    correctChoiceId: "b",
    explanation:
      "The concept translates the insight into a simple promise: accounting can feel quick and manageable.",
    incorrectFeedback: {
      a: "Advanced features may reinforce the fear of complexity.",
      c: "Innovative is generic and not connected to the user's tension.",
      d: "Tax imagery can make the product feel more intimidating.",
    },
    practicalExample:
      "A landing page could show a five-minute invoice flow with copy focused on relief and speed.",
    keyTakeaway: "Strong ideas turn a real tension into a memorable promise.",
    hint: "Choose the idea that answers the user's emotional barrier.",
  },
  {
    id: "creative-02",
    learningPath: "Creative Thinking",
    skill: "Concept Development",
    topic: "Avoiding Generic Ideas",
    difficulty: "Mid-level",
    question:
      "A campaign idea says “Work smarter, not harder.” Why is this weak for a premium design tool?",
    choices: [
      { id: "a", text: "It is too specific for most audiences." },
      { id: "b", text: "It is familiar, broad, and does not reveal a distinctive product point of view." },
      { id: "c", text: "It uses too few words to be useful." },
      { id: "d", text: "It cannot be used with visual design." },
    ],
    correctChoiceId: "b",
    explanation:
      "The line is overused and could apply to almost any productivity product, so it does not create a distinct direction.",
    incorrectFeedback: {
      a: "The problem is the opposite: it is too broad.",
      c: "Short copy can be strong when it is specific.",
      d: "It can be visualized, but that does not make it strategically strong.",
    },
    practicalExample:
      "A sharper concept might focus on “turn rough ideas into client-ready systems” if that is the product's true value.",
    keyTakeaway: "A creative direction should make the product feel more specific, not more interchangeable.",
    hint: "Ask whether another product could say the same thing.",
  },
  {
    id: "creative-03",
    learningPath: "Creative Thinking",
    skill: "Evaluation",
    topic: "Selecting Ideas",
    difficulty: "Senior",
    question:
      "Two ideas are equally polished. One is visually exciting but unrelated to the insight; the other is quieter but directly solves the audience tension. Which should move forward first?",
    choices: [
      { id: "a", text: "The quieter idea, then strengthen its visual expression." },
      { id: "b", text: "The exciting idea, because attention matters more than relevance." },
      { id: "c", text: "Neither, because all quiet ideas are weak." },
      { id: "d", text: "Both, without deciding on a strategic direction." },
    ],
    correctChoiceId: "a",
    explanation:
      "A strong creative direction should connect to the insight. Visual energy can be improved after the strategic core is right.",
    incorrectFeedback: {
      b: "Attention without relevance often creates shallow work.",
      c: "Quiet ideas can be powerful when they are precise.",
      d: "Moving both forward avoids the necessary strategic choice.",
    },
    practicalExample:
      "A design team can keep the insight-led concept and explore bolder art direction routes for it.",
    keyTakeaway: "Strategy gives creative work its spine; polish should serve it.",
    hint: "Separate strategic strength from visual execution.",
  },
  {
    id: "uxw-01",
    learningPath: "UX Writing",
    skill: "Microcopy",
    topic: "Button Labels",
    difficulty: "Junior",
    question:
      "Which button label is the clearest for saving changes?",
    choices: [
      { id: "a", text: "Save changes" },
      { id: "b", text: "Confirm" },
      { id: "c", text: "Continue" },
      { id: "d", text: "Submit" },
    ],
    correctChoiceId: "a",
    explanation:
      "“Save changes” tells users both the action and what will happen, so they do not have to guess what the button is confirming or submitting.",
    incorrectFeedback: {
      b: "Confirm is vague because it does not say what the user is confirming.",
      c: "Continue suggests moving forward, but it does not clearly say that changes will be saved.",
      d: "Submit is generic and does not explain the result of the action.",
    },
    practicalExample:
      "Use a specific action label instead of a generic word such as “Confirm”.",
    keyTakeaway: "Button labels should describe the action clearly.",
    hint: "Choose the label that tells the user exactly what will happen.",
  },
  {
    id: "uxw-02",
    learningPath: "UX Writing",
    skill: "Error Messages",
    topic: "Recovery",
    difficulty: "Junior",
    question:
      "Which error message best helps a user fix a password problem?",
    choices: [
      { id: "a", text: "Password failed." },
      { id: "b", text: "Your password must include at least 8 characters and 1 number." },
      { id: "c", text: "Invalid credentials maybe." },
      { id: "d", text: "Try harder." },
    ],
    correctChoiceId: "b",
    explanation:
      "It explains the requirement and gives the user a concrete path to completion.",
    incorrectFeedback: {
      a: "It identifies a problem but not the fix.",
      c: "It is uncertain and may confuse the user.",
      d: "It is hostile and unhelpful.",
    },
    practicalExample:
      "Inline validation can show the password requirements before the user submits the form.",
    keyTakeaway: "Helpful microcopy lowers effort at the moment of friction.",
    hint: "The best message tells the user exactly what to change.",
  },
  {
    id: "uxw-03",
    learningPath: "UX Writing",
    skill: "Empty States",
    topic: "First Use",
    difficulty: "Junior",
    question:
      "A user opens a notes page for the first time. Which empty state is strongest?",
    choices: [
      { id: "a", text: "No data." },
      { id: "b", text: "You have no notes yet. Save useful takeaways from quizzes here." },
      { id: "c", text: "This page is empty because you did not do anything." },
      { id: "d", text: "Error: notes unavailable." },
    ],
    correctChoiceId: "b",
    explanation:
      "It explains the empty state and gives the user a reason to use the feature.",
    incorrectFeedback: {
      a: "It is technically true but not helpful.",
      c: "It blames the user.",
      d: "It incorrectly frames a normal first-use state as an error.",
    },
    practicalExample:
      "A learning app can show an empty notes state with a small example takeaway and a prompt to start a quiz.",
    keyTakeaway: "Empty states should orient users and invite the next useful action.",
    hint: "Empty does not have to feel like a dead end.",
  },
  {
    id: "ielts-01",
    learningPath: "IELTS Preparation",
    skill: "Reading",
    topic: "Paraphrase Recognition",
    difficulty: "B2",
    question:
      "Passage: “Many remote workers report that flexible schedules help them concentrate, although some miss informal office conversations.” Which statement best matches the passage?",
    choices: [
      { id: "a", text: "All remote workers are more productive than office workers." },
      { id: "b", text: "Flexible schedules can support focus, but remote work may reduce casual interaction." },
      { id: "c", text: "Remote workers dislike flexible schedules." },
      { id: "d", text: "Office conversations always prevent concentration." },
    ],
    correctChoiceId: "b",
    explanation:
      "The answer keeps both parts of the original meaning: better concentration and missing informal conversations.",
    incorrectFeedback: {
      a: "The passage says many, not all, and does not compare productivity.",
      c: "The passage says flexible schedules help concentration.",
      d: "The passage does not say office conversations always prevent focus.",
    },
    practicalExample:
      "In IELTS Reading, correct answers often paraphrase the text instead of repeating exact words.",
    keyTakeaway: "Match the full meaning, not just one familiar word.",
    hint: "Look for the answer that preserves both the benefit and the limitation.",
  },
  {
    id: "ielts-02",
    learningPath: "IELTS Preparation",
    skill: "Listening",
    topic: "Distractors",
    difficulty: "B1",
    question:
      "Transcript: “The workshop was first planned for Tuesday, then moved to Thursday. Actually, the room is unavailable then, so it will now be held on Friday.” What is the final workshop day?",
    choices: [
      { id: "a", text: "Tuesday" },
      { id: "b", text: "Thursday" },
      { id: "c", text: "Friday" },
      { id: "d", text: "Saturday" },
    ],
    correctChoiceId: "c",
    explanation:
      "The speaker corrects the earlier dates. The final confirmed day is Friday.",
    incorrectFeedback: {
      a: "Tuesday was the original plan, not the final answer.",
      b: "Thursday was a changed plan, but it was corrected again.",
      d: "Saturday is not mentioned.",
    },
    practicalExample:
      "IELTS Listening often includes corrections, so the last confirmed detail may be the answer.",
    keyTakeaway: "Listen for corrections like “actually,” “changed to,” and “now.”",
    hint: "The first date you hear is not always the answer.",
  },
  {
    id: "ielts-03",
    learningPath: "IELTS Preparation",
    skill: "Writing",
    topic: "Task 2 Thesis",
    difficulty: "B2",
    question:
      "Which thesis statement is strongest for an essay about whether companies should allow remote work?",
    choices: [
      { id: "a", text: "Remote work is a topic that many people discuss nowadays." },
      { id: "b", text: "I will write about remote work in this essay." },
      { id: "c", text: "Companies should offer remote work when roles allow it because it can improve focus and widen hiring options." },
      { id: "d", text: "Remote work is good and bad." },
    ],
    correctChoiceId: "c",
    explanation:
      "It gives a clear position and previews two reasons, which helps structure the essay.",
    incorrectFeedback: {
      a: "This is a broad opening, not a clear thesis.",
      b: "This announces the essay but does not give a position.",
      d: "This is too vague to guide body paragraphs.",
    },
    practicalExample:
      "A strong IELTS Task 2 introduction usually includes a direct answer to the question and a clear direction for the essay.",
    keyTakeaway: "A thesis should state your position and guide your structure.",
    hint: "Look for the option with a position and reasons.",
  },
  {
    id: "ielts-04",
    learningPath: "IELTS Preparation",
    skill: "Speaking",
    topic: "Extending Answers",
    difficulty: "B1",
    question:
      "For IELTS Speaking Part 1, which answer best extends the response naturally? Question: “Do you like working in teams?”",
    choices: [
      { id: "a", text: "Yes." },
      { id: "b", text: "Yes, because I can hear different ideas and usually solve problems faster with other people." },
      { id: "c", text: "Team work team work team work is very good." },
      { id: "d", text: "I memorized that teamwork is a significant factor in contemporary society." },
    ],
    correctChoiceId: "b",
    explanation:
      "It answers directly, gives a reason, and sounds natural without being memorized.",
    incorrectFeedback: {
      a: "It is too short and does not show language range.",
      c: "It repeats words without developing an idea.",
      d: "It sounds memorized and unnatural for Part 1.",
    },
    practicalExample:
      "A simple pattern is answer + reason + small example.",
    keyTakeaway: "Natural extension is better than memorized complexity.",
    hint: "Choose the answer that sounds like a real person explaining why.",
  },
  {
    id: "uxw-04",
    learningPath: "UX Writing",
    skill: "Localization",
    skillTh: "การปรับข้อความให้เหมาะกับภาษาและบริบท",
    topic: "Thai and English Interface Copy",
    topicTh: "ข้อความ UI ภาษาไทยและภาษาอังกฤษ",
    difficulty: "Mid-level",
    question:
      "A bilingual checkout screen shows this long Thai message: “ระบบไม่สามารถดำเนินการชำระเงินได้ในขณะนี้ กรุณาตรวจสอบข้อมูลบัตรและลองอีกครั้ง หรือเลือกวิธีชำระเงินอื่นที่พร้อมใช้งาน”. What should the UX writer check first?",
    questionTh:
      "หน้าชำระเงินสองภาษาแสดงข้อความไทยยาวว่า “ระบบไม่สามารถดำเนินการชำระเงินได้ในขณะนี้ กรุณาตรวจสอบข้อมูลบัตรและลองอีกครั้ง หรือเลือกวิธีชำระเงินอื่นที่พร้อมใช้งาน” UX Writer ควรตรวจอะไรก่อน?",
    choices: [
      { id: "a", text: "Whether the Thai message wraps correctly and gives a clear recovery action.", textTh: "ข้อความไทยตัดบรรทัดถูกต้อง และบอกวิธีแก้ปัญหาอย่างชัดเจนหรือไม่" },
      { id: "b", text: "Whether the Thai text can be replaced with a shorter English-only message.", textTh: "ควรเปลี่ยนข้อความไทยเป็นภาษาอังกฤษสั้น ๆ อย่างเดียวหรือไม่" },
      { id: "c", text: "Whether the message uses a decorative gradient text style.", textTh: "ข้อความควรใช้สไตล์ตัวอักษรแบบ gradient เพื่อให้ดูสวยขึ้นหรือไม่" },
      { id: "d", text: "Whether the error can be hidden until the user contacts support.", textTh: "ควรซ่อน error จนกว่าผู้ใช้จะติดต่อ support หรือไม่" },
    ],
    correctChoiceId: "a",
    explanation:
      "Localized interface copy must remain readable, usable, and action-oriented. The user needs to know what happened and what to do next.",
    explanationTh:
      "ข้อความ UI ที่แปลแล้วต้องอ่านง่าย ใช้งานได้จริง และบอกทางแก้ปัญหา ผู้ใช้ควรรู้ว่าเกิดอะไรขึ้นและควรทำอะไรต่อ",
    incorrectFeedback: {
      b: "Removing Thai would reduce accessibility for Thai-speaking users.",
      c: "Decorative text can reduce readability, especially for important errors.",
      d: "Hiding the error blocks recovery and increases support burden.",
    },
    incorrectFeedbackTh: {
      b: "การตัดภาษาไทยออกทำให้ผู้ใช้ที่ถนัดภาษาไทยเข้าใจยากขึ้น",
      c: "ข้อความ error ต้องอ่านง่ายก่อนสวยงาม โดยเฉพาะบนมือถือ",
      d: "การซ่อน error ทำให้ผู้ใช้แก้ปัญหาไม่ได้และเพิ่มภาระให้ support",
    },
    practicalExample:
      "A payment form can keep the Thai message in a readable block, then show two clear actions: check card details or choose another payment method.",
    practicalExampleTh:
      "ฟอร์มชำระเงินอาจแสดงข้อความไทยในบล็อกที่อ่านง่าย พร้อมปุ่มหรือคำแนะนำ 2 ทางคือ ตรวจข้อมูลบัตร หรือเลือกวิธีชำระเงินอื่น",
    keyTakeaway: "Localization quality includes layout behavior, clarity, and recovery guidance.",
    keyTakeawayTh: "คุณภาพของ Localization ไม่ใช่แค่แปลถูก แต่ต้องอ่านง่าย ชัดเจน และช่วยให้ผู้ใช้แก้ปัญหาได้",
    hint: "Think about both text behavior and usefulness.",
    hintTh: "คิดทั้งเรื่องการตัดบรรทัดของข้อความ และประโยชน์ที่ผู้ใช้ได้รับ",
    vocabulary: [
      {
        id: "vocab-localized-copy",
        word: "Localized copy",
        thaiMeaning: "ข้อความที่ปรับให้เหมาะกับภาษาและบริบทของผู้ใช้",
        partOfSpeech: "noun",
        simpleDefinition: "Interface text adapted for a specific language or culture.",
        exampleSentence: "Localized copy should stay clear on small screens.",
        exampleTranslationTh: "ข้อความที่ปรับตามภาษาและบริบทควรยังอ่านชัดบนหน้าจอเล็ก",
        skill: "UX Writing",
        topic: "Localization",
      },
      {
        id: "vocab-recovery-action",
        word: "Recovery action",
        thaiMeaning: "การกระทำที่ช่วยให้ผู้ใช้แก้ปัญหาและไปต่อได้",
        partOfSpeech: "noun",
        simpleDefinition: "A next step that helps the user fix a problem.",
        exampleSentence: "The error message gives a recovery action.",
        exampleTranslationTh: "ข้อความ error บอกวิธีแก้ปัญหาให้ผู้ใช้",
        skill: "UX Writing",
        topic: "Error Messages",
      },
    ],
  },
  {
    id: "designops-q-what-is-designops",
    learningPath: "DesignOps",
    skill: "Workflow Diagnosis",
    topic: "What is DesignOps?",
    difficulty: "Junior",
    question: "A design team loses time because requests arrive in chat, email, and random meetings. What should DesignOps improve first?",
    choices: [
      { id: "a", text: "Create one clear intake flow for design requests.", textTh: "สร้าง intake flow เดียวสำหรับรับ request งานออกแบบ" },
      { id: "b", text: "Ask designers to work faster without changing the process.", textTh: "ขอให้ designer ทำงานเร็วขึ้นโดยไม่เปลี่ยน process" },
      { id: "c", text: "Hide all requests until the end of the week.", textTh: "ซ่อน request ทั้งหมดจนถึงปลายสัปดาห์" },
      { id: "d", text: "Change the brand colors.", textTh: "เปลี่ยนสีแบรนด์" },
    ],
    correctChoiceId: "a",
    explanation: "DesignOps reduces operational friction. A clear intake flow makes work visible and easier to prioritize.",
    explanationTh: "DesignOps ช่วยลด friction ในการทำงาน intake flow ที่ชัดทำให้งานมองเห็นและจัดลำดับง่ายขึ้น",
    incorrectFeedback: { b: "Speed pressure does not fix a broken request system.", c: "Hiding requests reduces visibility.", d: "Brand color is not the workflow issue." },
    practicalExample: "Use a single request form with goal, owner, deadline, assets, and impact.",
    keyTakeaway: "DesignOps improves the system around design work.",
    hint: "Look for the answer that improves how work enters the team.",
  },
  {
    id: "ux-research-q-research-question-vs-business-question",
    learningPath: "UX Research",
    skill: "Research Planning",
    topic: "Research Question vs Business Question",
    difficulty: "Junior",
    question: "A business question asks, “How can we increase paid signup?” Which research question is strongest?",
    choices: [
      { id: "a", text: "Where do users feel unsure before choosing a paid plan?", textTh: "ผู้ใช้ไม่มั่นใจก่อนเลือก paid plan ตรงไหน?" },
      { id: "b", text: "Can we make the button bigger?", textTh: "เราทำปุ่มให้ใหญ่ขึ้นได้ไหม?" },
      { id: "c", text: "Do users agree our product is great?", textTh: "ผู้ใช้เห็นด้วยไหมว่า product ของเราดีมาก?" },
      { id: "d", text: "Can marketing promise a discount?", textTh: "marketing ให้ส่วนลดได้ไหม?" },
    ],
    correctChoiceId: "a",
    explanation: "The research question focuses on user uncertainty, which can be studied and turned into product learning.",
    explanationTh: "คำถามนี้โฟกัสความไม่มั่นใจของผู้ใช้ ซึ่งนำไปศึกษาและแปลงเป็น product learning ได้",
    incorrectFeedback: { b: "This jumps to a solution.", c: "This is leading and too broad.", d: "This is a business tactic, not a user-learning question." },
    practicalExample: "Interview users who considered upgrading but stopped before checkout.",
    keyTakeaway: "Good research questions turn business goals into user-learning goals.",
    hint: "Choose the question that helps the team learn about user behavior.",
  },
  {
    id: "stock-investing-q-saving-vs-investing",
    learningPath: "Stock Investing",
    skill: "Risk Basics",
    topic: "Saving vs Investing",
    difficulty: "Beginner",
    question: "In a fictional practice plan, which money should usually stay out of risky investing first?",
    choices: [
      { id: "a", text: "Emergency money needed for rent and health costs.", textTh: "เงินฉุกเฉินที่ต้องใช้จ่ายค่าเช่าและสุขภาพ" },
      { id: "b", text: "Long-term practice portfolio money the learner can afford to risk.", textTh: "เงินพอร์ตฝึกระยะยาวที่ผู้เรียนรับความเสี่ยงได้" },
      { id: "c", text: "A tiny simulated amount in a learning exercise.", textTh: "จำนวนเงินสมมติเล็ก ๆ ในแบบฝึกหัด" },
      { id: "d", text: "Fictional company research notes.", textTh: "โน้ตวิเคราะห์บริษัทสมมติ" },
    ],
    correctChoiceId: "a",
    explanation: "Emergency funds need safety and liquidity. Risky investing can lose value at the wrong time.",
    explanationTh: "เงินฉุกเฉินต้องปลอดภัยและใช้ได้ทันที การลงทุนเสี่ยงอาจขาดทุนในเวลาที่จำเป็นต้องใช้เงิน",
    incorrectFeedback: { b: "Long-term risk money is different from emergency money.", c: "Simulation does not put real emergency money at risk.", d: "Research notes are not money." },
    practicalExample: "Practice with fictional companies before making real decisions.",
    keyTakeaway: "Do not treat investing as a safe place for emergency money.",
    hint: "Look for the money that must stay liquid and safer.",
    contentVerification: {
      verificationStatus: "time-sensitive",
      lastVerifiedAt: "2026-07-25",
      officialSourceNames: ["The Securities and Exchange Commission, Thailand (SEC)", "The Stock Exchange of Thailand (SET)"],
      disclaimer: {
        en: "Educational simulation only. Not financial advice or a Buy/Sell/Hold recommendation.",
        th: "แบบฝึกหัดเพื่อการศึกษาเท่านั้น ไม่ใช่คำแนะนำการลงทุนหรือคำแนะนำซื้อ/ขาย/ถือ",
      },
    },
  },
  {
    id: "thai-tax-personal-finance-q-understanding-the-tax-year",
    learningPath: "Thai Tax & Personal Finance",
    skill: "Tax Fundamentals",
    topic: "Understanding the Tax Year",
    difficulty: "Beginner",
    question: "In a fictional Thai tax learning scenario, what should a learner check before using a filing deadline from an old note?",
    choices: [
      { id: "a", text: "The current Revenue Department information for the relevant tax year.", textTh: "ข้อมูลปัจจุบันจากกรมสรรพากรสำหรับปีภาษีที่เกี่ยวข้อง" },
      { id: "b", text: "A social media post with no source.", textTh: "โพสต์โซเชียลที่ไม่มีแหล่งข้อมูล" },
      { id: "c", text: "A friend's refund amount.", textTh: "จำนวนเงินคืนภาษีของเพื่อน" },
      { id: "d", text: "A design portfolio checklist.", textTh: "checklist พอร์ตออกแบบ" },
    ],
    correctChoiceId: "a",
    explanation: "Tax filing details are time-sensitive. Learners should check official current information before real filing decisions.",
    explanationTh: "รายละเอียดการยื่นภาษีเปลี่ยนตามเวลาได้ ควรตรวจข้อมูลทางการปัจจุบันก่อนตัดสินใจยื่นจริง",
    incorrectFeedback: { b: "Unsourced social posts can be outdated or wrong.", c: "A friend's situation may not apply.", d: "This is unrelated to tax filing." },
    practicalExample: "Use this app to prepare questions and documents, then verify final details with the Revenue Department or a tax professional.",
    keyTakeaway: "Tax learning content must be tied to tax year and official verification.",
    hint: "Choose the official and tax-year-aware source.",
    contentVerification: {
      jurisdiction: "TH",
      taxYear: 2025,
      lastVerifiedAt: "2026-07-25",
      verificationStatus: "time-sensitive",
      officialSourceNames: ["The Revenue Department of Thailand"],
      disclaimer: {
        en: "Educational content only. Not an official tax calculation.",
        th: "เนื้อหานี้ใช้เพื่อการศึกษา ไม่ใช่การคำนวณภาษีอย่างเป็นทางการ",
      },
    },
  },
];

type QuestionThaiContent = {
  skillTh: string;
  topicTh: string;
  questionTh: string;
  choicesTh: Record<string, string>;
  explanationTh: string;
  incorrectFeedbackTh: Record<string, string>;
  practicalExampleTh: string;
  keyTakeawayTh: string;
  hintTh: string;
  vocabulary: VocabularyItem[];
};

const thaiContent: Record<string, QuestionThaiContent> = {
  "ux-01": {
    skillTh: "ลำดับขั้นตอนที่ผู้ใช้ต้องผ่านเพื่อทำเป้าหมายให้สำเร็จ",
    topicTh: "ขั้นตอนชำระเงิน",
    questionTh: "ผู้ใช้มาถึงหน้าชำระเงินแล้วเพิ่งพบว่าสินค้าหมด ทีม product ควรปรับปรุงอะไรก่อน?",
    choicesTh: {
      a: "ทำข้อความสินค้าหมดบนหน้าชำระเงินให้เด่นขึ้น",
      b: "ตรวจสอบสินค้าในสต็อกก่อนที่ผู้ใช้จะถึงขั้นตอนชำระเงิน",
      c: "ให้ผู้ใช้กดรีเฟรชหน้าก่อนจ่ายเงิน",
      d: "ซ่อนสินค้าที่หมดจากประวัติคำสั่งซื้อ",
    },
    explanationTh: "ควรตรวจสอบ availability ให้เร็วขึ้นใน flow เพื่อป้องกันความหงุดหงิดในจุดที่ผู้ใช้กำลังจะตัดสินใจจ่ายเงิน",
    incorrectFeedbackTh: {
      a: "ข้อความที่ชัดขึ้นช่วยหลังเกิดปัญหา แต่ไม่ได้ป้องกันปัญหาตั้งแต่ต้น",
      c: "การให้ผู้ใช้รีเฟรชเป็นการผลักภาระให้ผู้ใช้แทนที่จะปรับ flow",
      d: "ประวัติคำสั่งซื้อไม่เกี่ยวกับปัญหาที่เกิดใน checkout",
    },
    practicalExampleTh: "เว็บ e-commerce สามารถตรวจ stock ตอนเปิด cart และตรวจอีกครั้งก่อนสร้าง order",
    keyTakeawayTh: "ป้องกัน error ที่คาดเดาได้ก่อนผู้ใช้ถึงขั้นตอนสำคัญ",
    hintTh: "คิดว่าระบบควรตรวจเจอปัญหานี้เร็วที่สุดตรงไหน",
    vocabulary: [
      vocab("user-flow", "User Flow", "ลำดับขั้นตอนที่ผู้ใช้ต้องผ่านเพื่อทำเป้าหมายให้สำเร็จ", "noun", "The steps a user takes to finish a task.", "A checkout user flow should prevent late surprises.", "User Flow ของ checkout ควรป้องกันปัญหาที่มาเจอช้าเกินไป", "UX/UI Design", "Checkout Flow"),
      vocab("availability", "Availability", "ความพร้อมของสินค้า หรือบริการ", "noun", "Whether something is available to use or buy.", "Check product availability before payment.", "ตรวจสอบความพร้อมของสินค้าก่อนชำระเงิน", "UX/UI Design", "Checkout Flow"),
    ],
  },
  "ux-02": {
    skillTh: "การออกแบบปฏิสัมพันธ์ระหว่างผู้ใช้กับระบบ",
    topicTh: "ประสบการณ์การกรอกฟอร์ม",
    questionTh: "ฟอร์มสมัครสมาชิกขึ้นว่า “Something went wrong” แต่จริง ๆ email ไม่ถูกต้อง UX ที่ดีควรปรับอย่างไร?",
    choicesTh: {
      a: "แสดง error ใกล้ช่อง email พร้อมวิธีแก้ที่ชัดเจน",
      b: "แสดง loading spinner ให้นานขึ้น",
      c: "ย้ายฟอร์มลงไปด้านล่างหน้า",
      d: "ทำพื้นหลังทั้งหน้าจอเป็นสีแดง",
    },
    explanationTh: "Field-level error ช่วยให้ผู้ใช้เห็นจุดที่ต้องแก้และรู้วิธีแก้ทันที",
    incorrectFeedbackTh: {
      b: "spinner ไม่ได้บอกว่าผิดตรงไหน",
      c: "ตำแหน่งฟอร์มไม่ช่วยเรื่องการแก้ error",
      d: "สีแดงทั้งหน้าจอทำให้ตกใจและยังไม่บอกวิธีแก้",
    },
    practicalExampleTh: "ใต้ช่อง email อาจเขียนว่า “Enter a valid email address, like name@example.com”",
    keyTakeawayTh: "Error ที่ดีต้องบอกปัญหาและทางแก้",
    hintTh: "เลือกคำตอบที่ช่วยให้ผู้ใช้แก้ปัญหาได้ทันที",
    vocabulary: [vocab("field-level-error", "Field-level error", "ข้อความผิดพลาดที่แสดงใกล้ช่องกรอกข้อมูล", "noun", "An error shown near the field that needs fixing.", "Field-level errors reduce confusion.", "Field-level error ช่วยลดความสับสน", "UX/UI Design", "Form UX")],
  },
  "ux-03": {
    skillTh: "การจัดโครงสร้างข้อมูลและเมนูให้หาเจอได้ง่าย",
    topicTh: "Navigation",
    questionTh: "ข้อมูล analytics บอกว่าผู้ใช้มักเปิด Settings เมื่อต้องการจัดการ invoice ควรตรวจสอบอะไรก่อน?",
    choicesTh: {
      a: "Invoice ถูกตั้งชื่อและจัดกลุ่มในที่ที่ผู้ใช้คาดหวังหรือไม่",
      b: "Settings ควรใช้ icon สีสันมากขึ้นหรือไม่",
      c: "ผู้ใช้ควรได้รับ invoice น้อยลงหรือไม่",
      d: "ควรเอา navigation ออกจาก dashboard หรือไม่",
    },
    explanationTh: "พฤติกรรมนี้บอกว่า mental model ของผู้ใช้อาจไม่ตรงกับโครงสร้าง navigation ของผลิตภัณฑ์",
    incorrectFeedbackTh: {
      b: "สี icon อาจช่วยเล็กน้อย แต่ปัญหาหลักคือ findability และ label",
      c: "จำนวน invoice ไม่ได้อธิบายว่าทำไมผู้ใช้หาเมนูไม่เจอ",
      d: "เอา navigation ออกจะทำให้หา feature ยากขึ้น",
    },
    practicalExampleTh: "เมนู Billing อาจแยกเป็น Invoices, Plans และ Payment methods แทนการซ่อนทุกอย่างใน Settings",
    keyTakeawayTh: "ปัญหา navigation มักสะท้อน mental model ที่ไม่ตรงกัน",
    hintTh: "มองหาสาเหตุที่ผู้ใช้เลือกปลายทางผิด",
    vocabulary: [vocab("mental-model", "Mental model", "วิธีที่ผู้ใช้คิดว่าระบบควรทำงาน", "noun", "A user's expectation of how something works.", "Navigation should match the user's mental model.", "Navigation ควรตรงกับ mental model ของผู้ใช้", "UX/UI Design", "Navigation")],
  },
  "creative-01": {
    skillTh: "การสร้างไอเดียจาก insight",
    topicTh: "Customer Insight",
    questionTh: "Brief บอกว่า freelancer ที่ยุ่งหลีกเลี่ยง accounting tools เพราะรู้สึกซับซ้อน concept ใดใช้ insight นี้ดีที่สุด?",
    choicesTh: {
      a: "แคมเปญที่โชว์ feature การเงินขั้นสูงจำนวนมาก",
      b: "Concept “finish your books before your coffee gets cold”",
      c: "คำกล่าวกว้าง ๆ ว่าเครื่องมือนี้ innovative",
      d: "ภาพที่เต็มไปด้วยเอกสารภาษีและเครื่องคิดเลข",
    },
    explanationTh: "Concept นี้เปลี่ยน insight เรื่องความซับซ้อนให้เป็นคำมั่นสัญญาว่า accounting ทำได้เร็วและจัดการง่าย",
    incorrectFeedbackTh: {
      a: "feature เยอะอาจยิ่งทำให้รู้สึกซับซ้อน",
      c: "innovative กว้างเกินไปและไม่ตอบความกังวลของผู้ใช้",
      d: "ภาพภาษีอาจทำให้รู้สึกหนักขึ้น",
    },
    practicalExampleTh: "Landing page อาจโชว์ flow การทำ invoice ภายใน 5 นาที พร้อม copy ที่เน้นความโล่งใจ",
    keyTakeawayTh: "ไอเดียที่ดีเปลี่ยน tension จริงของผู้ใช้ให้เป็น promise ที่จำง่าย",
    hintTh: "เลือก idea ที่ตอบอุปสรรคทางอารมณ์ของผู้ใช้",
    vocabulary: [vocab("insight", "Insight", "ความเข้าใจลึกเกี่ยวกับผู้ใช้หรือปัญหา", "noun", "A useful understanding about the audience.", "A strong concept starts from a clear insight.", "Concept ที่ดีเริ่มจาก insight ที่ชัด", "Creative Thinking", "Customer Insight")],
  },
  "creative-02": {
    skillTh: "การพัฒนา concept ให้เฉพาะเจาะจง",
    topicTh: "หลีกเลี่ยงไอเดียทั่วไป",
    questionTh: "ไอเดียแคมเปญ “Work smarter, not harder.” อ่อนสำหรับ design tool ระดับ premium เพราะอะไร?",
    choicesTh: {
      a: "เฉพาะเจาะจงเกินไปสำหรับผู้ชมส่วนใหญ่",
      b: "คุ้นเกินไป กว้างเกินไป และไม่แสดงมุมมองเฉพาะของผลิตภัณฑ์",
      c: "ใช้คำน้อยเกินไป",
      d: "ใช้กับ visual design ไม่ได้",
    },
    explanationTh: "ประโยคนี้ใช้บ่อยและใช้ได้กับหลายสินค้า จึงไม่ทำให้แบรนด์หรือ product แตกต่าง",
    incorrectFeedbackTh: {
      a: "ปัญหาคือกว้างเกินไป ไม่ใช่เฉพาะเกินไป",
      c: "copy สั้น ๆ ก็แข็งแรงได้ถ้าเฉพาะเจาะจง",
      d: "ทำเป็นภาพได้ แต่ไม่ได้แปลว่าแข็งแรงด้านกลยุทธ์",
    },
    practicalExampleTh: "อาจปรับเป็น “turn rough ideas into client-ready systems” ถ้านั่นคือคุณค่าจริงของ product",
    keyTakeawayTh: "Creative direction ควรทำให้ product เฉพาะขึ้น ไม่ใช่เหมือนทุกแบรนด์",
    hintTh: "ถามว่า product อื่นพูดประโยคนี้ได้เหมือนกันไหม",
    vocabulary: [vocab("generic", "Generic", "กว้างและธรรมดาจนไม่แตกต่าง", "adjective", "Not specific or distinctive.", "Generic ideas are easy to forget.", "ไอเดีย generic มักจำยาก", "Creative Thinking", "Concept Development")],
  },
  "creative-03": {
    skillTh: "การประเมินและเลือกไอเดีย",
    topicTh: "Selecting Ideas",
    questionTh: "มี 2 ไอเดียที่ polish เท่ากัน ไอเดียหนึ่งภาพสวยแต่ไม่เกี่ยวกับ insight อีกไอเดียเงียบกว่าแต่ตอบ tension ของผู้ชมโดยตรง ควรเลือกอะไรไปต่อก่อน?",
    choicesTh: {
      a: "เลือกไอเดียที่ตอบ insight แล้วค่อยทำ visual ให้แข็งแรงขึ้น",
      b: "เลือกไอเดียที่ภาพน่าตื่นเต้น เพราะ attention สำคัญกว่าความเกี่ยวข้อง",
      c: "ไม่เลือก เพราะไอเดียที่เงียบมักอ่อน",
      d: "ทำทั้งสองต่อโดยไม่เลือก direction",
    },
    explanationTh: "Creative direction ที่ดีต้องเชื่อมกับ insight ก่อน ส่วนพลังด้าน visual สามารถพัฒนาทีหลังได้",
    incorrectFeedbackTh: {
      b: "attention ที่ไม่ relevant มักทำให้งานตื้น",
      c: "ไอเดียที่เงียบอาจทรงพลังถ้าแม่น",
      d: "การไม่เลือกทำให้ทีมไม่มีทิศทางชัดเจน",
    },
    practicalExampleTh: "ทีม design อาจเก็บ concept ที่ตอบ insight ไว้ แล้วลอง art direction ที่กล้าขึ้นกับ concept นั้น",
    keyTakeawayTh: "Strategy คือแกนของงานสร้างสรรค์ ส่วน polish ควรรับใช้ strategy",
    hintTh: "แยกความแข็งแรงด้านกลยุทธ์ออกจากความสวยของ execution",
    vocabulary: [vocab("relevance", "Relevance", "ความเกี่ยวข้องกับผู้ใช้ ปัญหา หรือเป้าหมาย", "noun", "How closely an idea connects to the real need.", "Creative work needs both attention and relevance.", "งานสร้างสรรค์ต้องมีทั้ง attention และ relevance", "Creative Thinking", "Evaluation")],
  },
  "uxw-01": {
    skillTh: "การออกแบบข้อความใน UI",
    topicTh: "Button Labels",
    questionTh: "ปุ่มใดสื่อสารกับผู้ใช้ได้ชัดเจนที่สุดสำหรับการบันทึกสิ่งที่แก้ไข?",
    choicesTh: {
      a: "Save changes = บันทึกสิ่งที่แก้ไข",
      b: "Confirm = ยืนยัน แต่ไม่บอกว่ายืนยันเรื่องอะไร",
      c: "Continue = ไปต่อ แต่ไม่บอกว่าจะบันทึกหรือไม่",
      d: "Submit = ส่งข้อมูล เป็นคำกว้าง ๆ",
    },
    explanationTh: "“Save changes” บอกทั้งการกระทำและสิ่งที่จะเกิดขึ้น ผู้ใช้จึงไม่ต้องเดาว่าปุ่มนี้กำลังยืนยันหรือส่งข้อมูลอะไร",
    incorrectFeedbackTh: {
      b: "Confirm ยังไม่ชัดว่าผู้ใช้กำลังยืนยันอะไร",
      c: "Continue ทำให้รู้สึกว่าไปขั้นตอนถัดไป แต่ไม่ยืนยันว่าบันทึกแล้ว",
      d: "Submit เป็นคำทั่วไปและไม่บอกผลลัพธ์ของปุ่ม",
    },
    practicalExampleTh: "ใช้ข้อความบนปุ่มที่บอกการกระทำโดยตรง แทนคำกว้าง ๆ เช่น “ยืนยัน”",
    keyTakeawayTh: "ข้อความบนปุ่มควรบอกให้ชัดว่ากดแล้วจะเกิดอะไรขึ้น",
    hintTh: "เลือกปุ่มที่บอกผู้ใช้ได้ทันทีว่าจะเกิดอะไรขึ้นหลังคลิก",
    vocabulary: [
      vocab("clear", "Clear", "ชัดเจนและเข้าใจได้ง่าย", "adjective", "Easy to understand.", "A clear button label tells users what will happen.", "ปุ่มที่ clear จะบอกผู้ใช้ว่าจะเกิดอะไรขึ้น", "UX Writing", "Button Labels"),
      vocab("changes", "Changes", "สิ่งที่มีการแก้ไข", "noun", "Things that have been edited.", "Save changes after editing your profile.", "บันทึก changes หลังจากแก้ไข profile", "UX Writing", "Button Labels"),
    ],
  },
  "uxw-02": {
    skillTh: "การเขียนข้อความ error เพื่อช่วยให้ผู้ใช้แก้ปัญหา",
    topicTh: "Recovery",
    questionTh: "ข้อความ error ใดช่วยให้ผู้ใช้แก้ปัญหา password ได้ดีที่สุด?",
    choicesTh: {
      a: "Password failed.",
      b: "Your password must include at least 8 characters and 1 number.",
      c: "Invalid credentials maybe.",
      d: "Try harder.",
    },
    explanationTh: "ข้อความนี้บอก requirement ชัดเจนและช่วยให้ผู้ใช้รู้ว่าต้องแก้อะไร",
    incorrectFeedbackTh: {
      a: "บอกว่ามีปัญหา แต่ไม่บอกวิธีแก้",
      c: "ไม่มั่นใจและอาจทำให้สับสน",
      d: "ไม่สุภาพและไม่ช่วยแก้ปัญหา",
    },
    practicalExampleTh: "ระบบอาจแสดง requirement ก่อน submit เพื่อให้ผู้ใช้แก้ได้ทันที",
    keyTakeawayTh: "Microcopy ที่ดีช่วยลดแรงเสียดทานตอนผู้ใช้ติดปัญหา",
    hintTh: "คำตอบที่ดีที่สุดบอกว่าต้องเปลี่ยนอะไร",
    vocabulary: [vocab("requirement", "Requirement", "เงื่อนไขที่ต้องทำให้ครบ", "noun", "Something that is needed or required.", "The password requirement is clear.", "เงื่อนไขของ password ชัดเจน", "UX Writing", "Error Messages")],
  },
  "uxw-03": {
    skillTh: "การเขียน empty state",
    topicTh: "First Use",
    questionTh: "ผู้ใช้เปิดหน้า notes ครั้งแรก empty state แบบไหนดีที่สุด?",
    choicesTh: {
      a: "No data.",
      b: "You have no notes yet. Save useful takeaways from quizzes here.",
      c: "This page is empty because you did not do anything.",
      d: "Error: notes unavailable.",
    },
    explanationTh: "ข้อความนี้อธิบายสถานะว่างและชวนให้ผู้ใช้เข้าใจว่าฟีเจอร์นี้ใช้ทำอะไร",
    incorrectFeedbackTh: {
      a: "จริงแต่ไม่ช่วย",
      c: "ฟังเหมือนโทษผู้ใช้",
      d: "สถานะว่างครั้งแรกไม่ใช่ error",
    },
    practicalExampleTh: "แอปเรียนรู้อาจแสดงตัวอย่าง key takeaway และชวนให้เริ่ม quiz",
    keyTakeawayTh: "Empty state ควรช่วย orient ผู้ใช้และชวนไป action ที่มีประโยชน์",
    hintTh: "หน้าโล่งไม่จำเป็นต้องเป็นทางตัน",
    vocabulary: [vocab("empty-state", "Empty state", "หน้าหรือส่วนที่ยังไม่มีข้อมูลให้แสดง", "noun", "A screen shown when there is no content yet.", "A helpful empty state explains the next action.", "Empty state ที่ดีอธิบาย action ถัดไป", "UX Writing", "Empty States")],
  },
  "ielts-01": {
    skillTh: "การอ่านจับความหมายที่ถูก paraphrase",
    topicTh: "Paraphrase Recognition",
    questionTh: "Passage บอกว่า remote workers หลายคนมีสมาธิดีขึ้นจาก schedule ที่ยืดหยุ่น แต่บางคนคิดถึงการคุยไม่เป็นทางการใน office ข้อใดตรงกับความหมายที่สุด?",
    choicesTh: {
      a: "remote workers ทุกคน productive กว่า office workers",
      b: "ตารางที่ยืดหยุ่นช่วย focus ได้ แต่ remote work อาจลด casual interaction",
      c: "remote workers ไม่ชอบตารางยืดหยุ่น",
      d: "การคุยใน office ทำลายสมาธิเสมอ",
    },
    explanationTh: "คำตอบที่ถูกเก็บความหมายทั้งสองส่วน คือช่วยเรื่อง focus และมีข้อจำกัดเรื่อง casual conversation",
    incorrectFeedbackTh: {
      a: "passage ใช้ many ไม่ใช่ all และไม่ได้เทียบ productivity",
      c: "passage บอกว่า flexible schedules ช่วย concentration",
      d: "ไม่ได้บอกว่า office conversations ทำลายสมาธิเสมอ",
    },
    practicalExampleTh: "ใน IELTS Reading คำตอบที่ถูกมักใช้ paraphrase ไม่ได้คัดคำตรง ๆ จาก passage",
    keyTakeawayTh: "จับความหมายรวมให้ครบ ไม่ใช่เลือกจากคำที่คุ้นเพียงคำเดียว",
    hintTh: "มองหาคำตอบที่เก็บทั้งข้อดีและข้อจำกัด",
    vocabulary: [vocab("paraphrase", "Paraphrase", "พูดหรือเขียนความหมายเดิมด้วยคำอื่น", "verb/noun", "To express the same meaning with different words.", "IELTS answers often paraphrase the passage.", "คำตอบ IELTS มัก paraphrase passage", "IELTS Preparation", "Reading")],
  },
  "ielts-02": {
    skillTh: "การฟังจับตัวหลอกและการแก้ไขข้อมูล",
    topicTh: "Distractors",
    questionTh: "Transcript บอกว่า workshop เดิมคือ Tuesday แล้วย้ายเป็น Thursday แต่ห้องไม่ว่าง จึงจัด Friday วันสุดท้ายคือวันใด?",
    choicesTh: {
      a: "Tuesday",
      b: "Thursday",
      c: "Friday",
      d: "Saturday",
    },
    explanationTh: "ผู้พูดแก้ข้อมูลก่อนหน้า วันสุดท้ายที่ยืนยันคือ Friday",
    incorrectFeedbackTh: {
      a: "Tuesday เป็นแผนแรก ไม่ใช่คำตอบสุดท้าย",
      b: "Thursday เป็นแผนที่ถูกเปลี่ยนอีกครั้ง",
      d: "Saturday ไม่ได้ถูกพูดถึง",
    },
    practicalExampleTh: "IELTS Listening มักมีคำแก้ เช่น actually, changed to, now",
    keyTakeawayTh: "ฟังสัญญาณการแก้ข้อมูล เพราะคำตอบแรกที่ได้ยินอาจไม่ใช่คำตอบสุดท้าย",
    hintTh: "วันที่ได้ยินครั้งแรกอาจเป็น distractor",
    vocabulary: [vocab("distractor", "Distractor", "ข้อมูลหลอกที่ทำให้เลือกผิด", "noun", "Information that sounds possible but is not the final answer.", "Thursday is a distractor in this transcript.", "Thursday เป็น distractor ใน transcript นี้", "IELTS Preparation", "Listening")],
  },
  "ielts-03": {
    skillTh: "การเขียน thesis statement",
    topicTh: "Task 2 Thesis",
    questionTh: "Thesis statement ใดแข็งแรงที่สุดสำหรับ essay เรื่องบริษัทควรอนุญาต remote work หรือไม่?",
    choicesTh: {
      a: "Remote work เป็นหัวข้อที่หลายคนพูดถึงในปัจจุบัน",
      b: "ฉันจะเขียนเกี่ยวกับ remote work ใน essay นี้",
      c: "บริษัทควรให้ remote work เมื่อหน้าที่งานทำได้ เพราะช่วย focus และขยายตัวเลือกการจ้างงาน",
      d: "Remote work มีทั้งดีและไม่ดี",
    },
    explanationTh: "คำตอบนี้มี position ชัดเจนและบอกเหตุผลหลัก 2 ข้อ ทำให้ essay มีทิศทาง",
    incorrectFeedbackTh: {
      a: "เป็น opening กว้าง ๆ ยังไม่ใช่ thesis",
      b: "บอกว่าจะเขียนอะไร แต่ไม่ตอบจุดยืน",
      d: "กว้างเกินไปจนใช้จัด body paragraph ยาก",
    },
    practicalExampleTh: "IELTS Task 2 introduction ที่ดีมักตอบคำถามตรง ๆ และบอกทิศทางของ essay",
    keyTakeawayTh: "Thesis ควรบอกจุดยืนและช่วยจัดโครงสร้างคำตอบ",
    hintTh: "มองหาตัวเลือกที่มี position และ reasons",
    vocabulary: [vocab("thesis-statement", "Thesis statement", "ประโยคที่บอกจุดยืนหลักของ essay", "noun", "A sentence that states the main position of an essay.", "A clear thesis guides the whole essay.", "Thesis ที่ชัดช่วยนำทาง essay ทั้งชิ้น", "IELTS Preparation", "Writing")],
  },
  "ielts-04": {
    skillTh: "การตอบ Speaking ให้ขยายความอย่างเป็นธรรมชาติ",
    topicTh: "Extending Answers",
    questionTh: "IELTS Speaking Part 1 คำตอบใดขยายคำตอบได้เป็นธรรมชาติที่สุดสำหรับคำถาม “Do you like working in teams?”",
    choicesTh: {
      a: "Yes.",
      b: "ใช่ เพราะได้ฟังไอเดียที่หลากหลายและมักแก้ปัญหาได้เร็วขึ้นเมื่อทำงานกับคนอื่น",
      c: "พูดคำว่า team work ซ้ำ ๆ โดยไม่พัฒนา idea",
      d: "คำตอบที่ฟังเหมือนท่องจำและไม่เป็นธรรมชาติ",
    },
    explanationTh: "คำตอบนี้ตอบตรงคำถาม ให้เหตุผล และฟังเป็นธรรมชาติ ไม่เหมือนท่องจำ",
    incorrectFeedbackTh: {
      a: "สั้นเกินไปและไม่แสดง range ของภาษา",
      c: "ซ้ำคำแต่ไม่พัฒนา idea",
      d: "ฟังเหมือน memorized answer ซึ่งไม่เหมาะกับ Part 1",
    },
    practicalExampleTh: "ใช้ pattern ง่าย ๆ คือ answer + reason + small example",
    keyTakeawayTh: "การขยายคำตอบแบบธรรมชาติดีกว่าคำซับซ้อนที่ฟังเหมือนท่องจำ",
    hintTh: "เลือกคำตอบที่เหมือนคนจริงอธิบายเหตุผล",
    vocabulary: [vocab("extended-answer", "Extended answer", "คำตอบที่ขยายด้วยเหตุผลหรือตัวอย่าง", "noun", "An answer with more detail than a single word.", "Give an extended answer in Speaking Part 1.", "ให้ extended answer ใน Speaking Part 1", "IELTS Preparation", "Speaking")],
  },
};

function vocab(
  id: string,
  word: string,
  thaiMeaning: string,
  partOfSpeech: string,
  simpleDefinition: string,
  exampleSentence: string,
  exampleTranslationTh: string,
  skill: string,
  topic: string,
): VocabularyItem {
  return {
    id,
    word,
    thaiMeaning,
    partOfSpeech,
    simpleDefinition,
    exampleSentence,
    exampleTranslationTh,
    skill,
    topic,
  };
}

export const questions: Question[] = rawQuestions.map((question) => {
  const content = thaiContent[question.id];
  const path = learningPaths.find((item) => item.name === question.learningPath);
  const relatedLesson = path
    ? lessonsForPath(path.id).find((lesson) => {
        const haystack = `${question.topic} ${question.skill} ${question.topicTh ?? ""} ${question.skillTh ?? ""}`.toLowerCase();
        return haystack.includes(lesson.relatedTopic.toLowerCase());
      })
    : undefined;
  const metadata = {
    learningPathId: path?.id,
    lessonId: relatedLesson?.id,
    chapterId: relatedLesson?.id,
    topicId: relatedLesson?.slug ?? question.topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  };
  if (!content) return { ...question, ...metadata };

  const choices: Choice[] = question.choices.map((choice) => ({
    ...choice,
    textTh: choice.textTh ?? content.choicesTh[choice.id],
  }));

  return {
    ...question,
    ...metadata,
    ...content,
    choices,
  };
});
