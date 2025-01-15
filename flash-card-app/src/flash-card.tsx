import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCw, Shuffle, ThumbsUp, ThumbsDown } from 'lucide-react';

const FlashCard = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [cards, setCards] = useState([
  {
    question: "OSI Model ແມ່ນຫຍັງ? ມີຈັກຊັ້ນ ຄືຊັ້ນໃດແດ່?",
    answer: "OSI Model ເປັນມາດຕະຖານສາກົນການສື່ສານເຄືອຂ່າຍມີ 7 ຊັ້ນ: Physical, Data Link, Network, Transport, Session, Presentation, Application."
  },
  {
    question: "ຈົ່ງອະທິບາຍສິ່ງທີ່ເກີດຂຶ້ນໃນຊັ້ນ Application, Presentation ແລະ Session ໃນ OSI Model",
    answer: "Application Layer ເຮັດວຽກກັບ applications ໂດຍກົງ, Presentation Layer ແປງຂໍ້ມູນ/ເຂົ້າລະຫັດ, Session Layer ຄວບຄຸມການເຊື່ອມຕໍ່."
  },
  {
    question: "ຈົ່ງອະທິບາຍສິ່ງທີ່ເກີດຂຶ້ນໃນຊັ້ນ Transport ໃນ OSI Model ໃຫ້ລະອຽດ ແລະ ຄົບຖ້ວນ",
    answer: "Transport Layer ຮັບປະກັນການສົ່ງຂໍ້ມູນລະຫວ່າງ endpoints, ມີ TCP (reliable) ແລະ UDP (unreliable), ເຮັດ flow control ແລະ error checking."
  },
  {
    question: "ຈົ່ງອະທິບາຍສິ່ງທີ່ເກີດຂຶ້ນໃນຊັ້ນ Network ໃນ OSI Model ໃຫ້ລະອຽດ ແລະ ຄົບຖ້ວນ",
    answer: "Network Layer ຈັດການ routing, IP addressing, ເລືອກເສັ້ນທາງ ແລະ ແບ່ງແຍກ packets."
  },
  {
    question: "ຈົ່ງອະທິບາຍສິ່ງທີ່ເກີດຂຶ້ນໃນຊັ້ນ Data-Link ໃນ OSI Model ໃຫ້ລະອຽດ ແລະ ຄົບຖ້ວນ",
    answer: "Data Link Layer ຈັດການການສົ່ງຂໍ້ມູນລະຫວ່າງອຸປະກອນ, MAC addressing, ກວດສອບຄວາມຜິດພາດລະດັບ frame."
  },
  {
    question: "ຈົ່ງອະທິບາຍສິ່ງທີ່ເກີດຂຶ້ນໃນຊັ້ນ Physical ໃນ OSI Model ໃຫ້ລະອຽດ ແລະ ຄົບຖ້ວນ",
    answer: "Physical Layer ສົ່ງ bits ຜ່ານຕົວກາງ, ກຳນົດຄຸນລັກສະນະທາງກາຍະພາບ, topology ແລະ ການເຊື່ອມຕໍ່."
  },
  {
    question: "ຕົວກາງໃນການເຊື່ອມຕໍ່ປະຈຸບັນມີຈັກຮູບແບບ, ຄືຮູບແບບໃດແດ່? ຈົ່ງຍົກຕົວຢ່າງອຸປະກອນຂອງແຕ່ລະຮູບແບບ ພ້ອມທັງອະທິບາຍເຖິງສັນຍານຂອງມັນ",
    answer: "ຕົວກາງການເຊື່ອມຕໍ່ມີ 3 ແບບ: Guided Media (ສາຍ), Unguided Media (WiFi), Wireless Media (ດາວທຽມ)."
  },
  {
    question: "ກໍລະນີໃດທີ່ຄວນໃຊ້ສາຍ UTP ຮູບແບບ Straight-through ແລະ ກໍລະນີໃດຄວນໃຊ້ Cross-Over, ຍ້ອນຫຍັງ?",
    answer: "ສາຍ UTP ມີ 2 ແບບ: Straight-through (ເຊື່ອມຕໍ່ອຸປະກອນຕ່າງປະເພດ) ແລະ Cross-over (ເຊື່ອມຕໍ່ອຸປະກອນປະເພດດຽວກັນ)."
  },
  {
    question: "ການສົ່ງສັນຍານພາຍໃນສາຍ Fiber optic ມີຈັກຮູບແບບ? ແຕ່ລະແບບຕ່າງກັນແນວໃດ?",
    answer: "ສາຍ Fiber Optic ມີ 2 ແບບ: Single-mode (ລຳແສງດຽວ, ໄລຍະໄກ) ແລະ Multi-mode (ຫຼາຍລຳແສງ, ໄລຍະໃກ້)."
  },
  {
    question: "ອົງປະກອບໃນການສື່ສານ ແລະ ຮັບສົ່ງຂໍ້ມູນມີຫຍັງແດ່? ຕົວຢ່າງຖ້າເປັນການສື່ສານຂອງມະນຸດ, ອົງປະກອບໃນການສື່ສານຈະມີຫຍັງແດ່?",
    answer: "ອົງປະກອບການສື່ສານມີ Source, Message, Medium, Receiver ແລະ Protocol."
  },
  {
    question: "ຈົ່ງອະທິບາຍການຮັບສົ່ງຂໍ້ມູນແບບ Simplex transmission, Half-duplex transmission ແລະ Full-duplex transmission",
    answer: "ການຮັບສົ່ງຂໍ້ມູນມີ 3 ແບບ: Simplex (ທາງດຽວ), Half-duplex (ສອງທາງ ແຕ່ບໍ່ພ້ອມກັນ), Full-duplex (ສອງທາງພ້ອມກັນ)."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄຸນລັກສະນະຂອງສັນຍານຮູບແບບ LOS",
    answer: "LOS (Line of Sight) ແມ່ນສັນຍານເດີນທາງເປັນເສັ້ນຊື່, ຕ້ອງການເສັ້ນທາງທີ່ບໍ່ມີສິ່ງກີດຂວາງ."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄຸນລັກສະນະຂອງສັນຍານຮູບແບບ Ground wave ແລະ Sky wave",
    answer: "Ground wave ແມ່ນສັນຍານເດີນທາງຕາມໜ້າໂລກ (ຄວາມຖີ່ຕ່ຳ), Sky wave ແມ່ນສັນຍານສະທ້ອນຊັ້ນບັນຍາກາດ (ຄວາມຖີ່ສູງ)."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄຸນລັກສະນະຂອງສັນຍານຮູບແບບ Refraction",
    answer: "Refraction ແມ່ນສັນຍານຫັກເຫເມື່ອຜ່ານຕົວກາງຕ່າງກັນ, ເຮັດໃຫ້ປ່ຽນທິດທາງ."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄຸນລັກສະນະຂອງສັນຍານຮູບແບບ Diffraction",
    answer: "Diffraction ແມ່ນສັນຍານອ້ອມສິ່ງກີດຂວາງ, ເຮັດໃຫ້ສັນຍານອ່ອນລົງ."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄຸນລັກສະນະຂອງສັນຍານຮູບແບບ Reflection",
    answer: "Reflection ແມ່ນສັນຍານສະທ້ອນເມື່ອກະທົບພື້ນຜິວ, ສາມາດເຮັດໃຫ້ສັນຍານແຮງຂຶ້ນຫຼືອ່ອນລົງ."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄວາມແຕກຕ່າງລະຫວ່າງ Digital Signal ແລະ Analog Signal",
    answer: "Digital signal ເປັນສັນຍານແບບ discrete (0,1) ທົນທານຕໍ່ສັນຍານລົບກວນ, Analog signal ເປັນສັນຍານຕໍ່ເນື່ອງອ່ອນໄຫວຕໍ່ສັນຍານລົບກວນ."
  },
  {
    question: "ຈົ່ງອະທິບາຍລັກສະນະການກະຈາຍສັນຍານຂອງເສົາອາກາດແບບເສົາດ່ຽວ, ແບບໜວດກຸ້ງ(2ເສົາ) ແລະ ແບບຈານດາວທຽມ",
    answer: "ການກະຈາຍສັນຍານເສົາອາກາດມີ 3 ແບບ: ເສົາດຽວ (ທຸກທິດທາງ), ໜວດກຸ້ງ (ເປັນທິດທາງ), ຈານດາວທຽມ (ເປັນຈຸດ)."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄວາມໝາຍ Ethernet Throughput = 94.3 Mb/s (51.4 Mb/s Full Duplex) ແລະ Installation Antenna height for LOS = 3 Meter (0.6 Fernel) ໃນການຕັ້ງເສົາສັນຍານໝາຍຄວາມວ່າແນວໃດ?",
    answer: "Ethernet Throughput 94.3 Mb/s ແມ່ນຄວາມໄວໃນການສົ່ງຂໍ້ມູນ, ຄວາມສູງເສົາ 3 ເມັດຮັບປະກັນການສົ່ງສັນຍານແບບ LOS."
  },
  {
    question: "ຈົ່ງອະທິບາຍກ່ຽວກັບ Attitude, Frequency ແລະ Phase ຂອງຄື້ນສັນຍານ",
    answer: "Attitude ແມ່ນຄວາມສູງຄື້ນ, Frequency ແມ່ນຈຳນວນຮອບຕໍ່ວິນາທີ, Phase ແມ່ນມຸມຂອງຄື້ນຫຼືໄລຍະຫ່າງລະຫວ່າງຄື້ນ."
  },
  {
    question: "Line coding ແມ່ນຫຍັງ? ມີຈັກປະເພດ? ຄືປະເພດໃດແດ່ ໃຫ້ອະທິບາຍຫຍໍ້ແຕ່ລະປະເພດຕ່າງກັນແນວໃດ?",
    answer: "Line coding ມີ 4 ປະເພດ: Unipolar, Bipolar, Manchester, ແລະ Differential Manchester."
  },
  {
    question: "ຈົ່ງແຕ້ມສັນຍານ Digital ຮູບແບບ Unipolar Encoding ຂອງ bit ຂໍ້ມູນ",
    answer: "Unipolar Encoding ໃຊ້ລະດັບແຮງດັນບວກສຳລັບ bit 1 ແລະ 0 ສຳລັບ bit 0."
  },
  {
    question: "ຈົ່ງແຕ້ມສັນຍານ Digital ຮູບແບບ Bipolar Encoding ຂອງ bit ຂໍ້ມູນ",
    answer: "Bipolar Encoding ໃຊ້ລະດັບແຮງດັນບວກແລະລົບສະຫຼັບກັນສຳລັບ bit 1, ແລະ 0 ສຳລັບ bit 0."
  },
  {
    question: "ຈົ່ງແຕ້ມສັນຍານ Digital ຮູບແບບ Manchester Encoding ຂອງ bit ຂໍ້ມູນ",
    answer: "Manchester Encoding ມີການປ່ຽນລະດັບກາງບິດສະເໝີ, ບວກໄປລົບ = bit 1, ລົບໄປບວກ = bit 0."
  },
  {
    question: "ຈົ່ງແຕ້ມສັນຍານ Digital ຮູບແບບ Differential Manchester Encoding ຂອງ bit ຂໍ້ມູນ",
    answer: "Differential Manchester ມີການປ່ຽນລະດັບກາງບິດສະເໝີ, bit 1 ບໍ່ປ່ຽນການເລີ່ມຕົ້ນ, bit 0 ປ່ຽນການເລີ່ມຕົ້ນ."
  },
  {
    question: "ຈົ່ງອະທິບາຍກະບວນການ Amplitude Shift Keying",
    answer: "ASK (Amplitude Shift Keying) ມອດດູເລດໂດຍປ່ຽນຂະໜາດຄື້ນພາຫະ, ເໝາະກັບການສົ່ງຂໍ້ມູນໄລຍະໃກ້."
  },
  {
    question: "ຈົ່ງອະທິບາຍກະບວນການ Frequency Shift Keying",
    answer: "FSK (Frequency Shift Keying) ມອດດູເລດໂດຍປ່ຽນຄວາມຖີ່ຄື້ນພາຫະ, ທົນທານຕໍ່ສັນຍານລົບກວນດີກວ່າ ASK."
  },
  {
    question: "ຈົ່ງອະທິບາຍກະບວນການ Phase Shift Keying",
    answer: "PSK (Phase Shift Keying) ມອດດູເລດໂດຍປ່ຽນເຟສຄື້ນພາຫະ, ໃຊ້ໃນການສົ່ງຂໍ້ມູນຄວາມໄວສູງ."
  },
  {
    question: "ຈົ່ງອະທິບາຍ Quadrature Amplitude Modulation",
    answer: "QAM (Quadrature Amplitude Modulation) ລວມ ASK ແລະ PSK, ສົ່ງຂໍ້ມູນຫຼາຍບິດພ້ອມກັນ, ໃຊ້ໃນ digital cable TV ແລະ internet broadband."
  },
  {
    question: "ຈົ່ງອະທິບາຍກະບວນການ Multiplexing ພ້ອມທັງຍົກຕົວຢ່າງມາ 1 ແບບ",
    answer: "Multiplexing ແມ່ນເຕັກນິກລວມສັນຍານຫຼາຍຊ່ອງເຂົ້າດ້ວຍກັນ, ມີ FDM, TDM, ແລະ WDM."
  },
  {
    question: "ຈົ່ງຄິດໄລ່ຫາ Data ແລະ Parity bits ດ້ວຍວິທີ 2D Parity Check",
    answer: "2D Parity Check ຈັດຂໍ້ມູນເປັນຕາຕະລາງ, ຄິດໄລ່ parity bit ທັງແນວນອນແລະແນວຕັ້ງ."
  },
  {
    question: "ຈົ່ງຄິດໄລ່ຫາ Data ແລະ Parity bits ດ້ວຍວິທີ CRC",
    answer: "CRC (Cyclic Redundancy Check) ເອົາຂໍ້ມູນຄູນດ້ວຍ 2^r, ຫານດ້ວຍ polynomial ທີ່ກຳນົດ, ເອົາເສດເປັນ CRC."
  },
  {
    question: "ຈົ່ງຄິດໄລ່ຫາ Data ແລະ Parity bits ດ້ວຍວິທີ Check sum",
    answer: "Checksum ແບ່ງຂໍ້ມູນເປັນກຸ່ມ, ບວກເລກທຸກກຸ່ມ, ກັບບິດຂອງຜົນບວກ."
  },
  {
    question: "ຈົ່ງຄິດໄລ່ຫາ Data ແລະ Parity bits ດ້ວຍວິທີ Hamming Code",
    answer: "Hamming Code ໃສ່ parity bits ໃນຕຳແໜ່ງ 2^n, ແຕ່ລະ bit ກວດສອບຕຳແໜ່ງທີ່ກ່ຽວຂ້ອງ."
  },
  {
    question: "ຈົ່ງອະທິບາຍກົນໄກການຄວບຄຸມການໄຫຼຂອງຂໍ້ມູນຮູບແບບ Stop and Wait",
    answer: "Stop and Wait ຜູ້ສົ່ງສົ່ງຂໍ້ມູນໜຶ່ງ frame ແລ້ວລໍຖ້າການຢືນຢັນ (ACK), ວິທີງ່າຍແຕ່ປະສິດທິພາບຕ່ຳ."
  },
  {
    question: "ຈົ່ງອະທິບາຍກົນໄກການຄວບຄຸມການໄຫຼຂອງຂໍ້ມູນຮູບແບບ Go back N",
    answer: "Go Back N ສົ່ງຫຼາຍ frames ພ້ອມກັນ, ຖ້າຜິດພາດຈະສົ່ງຄືນທັງໝົດຕັ້ງແຕ່ frame ທີ່ຜິດພາດ."
  },
  {
    question: "ຈົ່ງອະທິບາຍກົນໄກການຄວບຄຸມການໄຫຼຂອງຂໍ້ມູນຮູບແບບ Selective repeat",
    answer: "Selective Repeat ສົ່ງຫຼາຍ frames ພ້ອມກັນ, ສົ່ງຄືນສະເພາະ frames ທີ່ຜິດພາດ, ປະສິດທິພາບສູງສຸດ."
  },
  {
    question: "ໂຄງສ້າງເຟມຂອງໂປຼໂຕໂຄນ HDLC ປະກອບດ້ວຍຫຍັງແດ່? ຈົ່ງອະທິບາຍແຕ່ລະພາກສ່ວນ",
    answer: "ໂຄງສ້າງເຟຣມ HDLC ມີ Flag, Address Field, Control Field, Information Field ແລະ FCS Field."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄວາມແຕກຕ່າງລະຫວ່າງ I-Frame, S-Frame ແລະ U-Frame ຂອງ HDLC",
    answer: "ເຟຣມ HDLC ມີ 3 ແບບ: I-Frame (ສົ່ງຂໍ້ມູນ), S-Frame (ຄວບຄຸມ), U-Frame (ຈັດການການເຊື່ອມຕໍ່)."
  },
  {
    question: "ຈົ່ງອະທິບາຍຄວາມໝາຍຂອງ Collision, ເກີດຂື້ນໄດ້ແນວໃດ ແລະ ຈະມີວິທີການຈັດການແນວໃດແດ່?",
    answer: "Collision ເກີດເມື່ອອຸປະກອນຫຼາຍໂຕສົ່ງຂໍ້ມູນພ້ອມກັນ, ແກ້ໄຂໂດຍໃຊ້ CSMA/CD ຫຼື CSMA/CA."
  },
  {
    question: "ຈົ່ງອະທິບາຍກົນໄກການເຮັດວຽກຂອງ CSMA/CD",
    answer: "CSMA/CD ກວດສອບສັນຍານກ່ອນສົ່ງ, ຖ້າພົບ collision ຈະຢຸດທັນທີ, ລໍຖ້າເວລາແບບສຸ່ມກ່ອນສົ່ງໃໝ່."
  },
  {
    question: "ຈົ່ງອະທິບາຍກົນໄກການເຮັດວຽກຂອງ CSMA/CA",
    answer: "CSMA/CA ກວດສອບສັນຍານກ່ອນສົ່ງ, ຫຼີກລ່ຽງ collision ໂດຍໃຊ້ RTS/CTS, ໃຊ້ໃນເຄືອຂ່າຍ wireless."
  },
  {
    question: "ຈົ່ງອະທິບາຍກົນໄກການເຮັດວຽກແບບ Reservation, Polling ແລະ Token passing ຂອງ Multiple Controlled Access",
    answer: "Multiple Controlled Access ມີ 3 ແບບ: Reservation (ຈອງເວລາ), Polling (ມີອຸປະກອນຫຼັກຄວບຄຸມ), Token Passing (ຜ່ານ token)."
  },
  {
    question: "ຈົ່ງອະທິບາຍການປະສົມສັນຍານຮູບແບບ Frequency Division Multiple Access",
    answer: "FDMA ແບ່ງຄວາມຖີ່ອອກເປັນຊ່ອງຍ່ອຍ, ແຕ່ລະຜູ້ໃຊ້ໄດ້ຮັບຄວາມຖີ່ເປັນຂອງຕົນເອງ."
  },
  {
    question: "ຈົ່ງອະທິບາຍການປະສົມສັນຍານຮູບແບບ Time Division Multiple Access",
    answer: "TDMA ແບ່ງເວລາອອກເປັນຊ່ວງ, ແຕ່ລະຜູ້ໃຊ້ໄດ້ຮັບຊ່ວງເວລາເປັນຂອງຕົນເອງ."
  },
  {
    question: "ຈົ່ງອະທິບາຍການປະສົມສັນຍານຮູບແບບ Code Division Multiple Access",
    answer: "CDMA ໃຊ້ລະຫັດພິເສດແຍກສັນຍານຂອງແຕ່ລະຜູ້ໃຊ້, ສົ່ງຂໍ້ມູນໃນເວລາແລະຄວາມຖີ່ດຽວກັນໄດ້, ມີຄວາມປອດໄພສູງ, ໃຊ້ໃນລະບົບ 3G ແລະ GPS."
  }
  ]);

  const shuffleCards = () => {
    const shuffled = [...cards]
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
    setIsFlipped(false);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    setIsFlipped(false);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleScore = (correct: boolean) => {
    if (correct) {
      setScore(prev => prev + 1);
    }
  };
  

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Score Display */}
      <div className="mb-4 text-center">
        <div className="bg-white rounded-lg shadow p-4 inline-block">
          <span className="text-lg font-semibold">
            ຄະແນນ: {score}/{totalAttempts} 
          </span>
          {totalAttempts > 0 && (
            <span className="ml-2 text-gray-500">
              ({Math.round((score/totalAttempts) * 100)}%)
            </span>
          )}
        </div>
      </div>

      <div className="relative perspective">
        <div 
          className={`relative w-full h-64 cursor-pointer transition-transform duration-500 transform-style-preserve-3d ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleFlip}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full bg-white rounded-xl shadow-lg p-6 backface-hidden">
            <div className="flex flex-col items-center justify-center h-full">
              <h2 className="text-xl font-semibold text-center">
                {cards[currentIndex].question}
              </h2>
              <div className="absolute bottom-2 text-gray-400 text-sm">
                ຄລິກເພື່ອເບິ່ງຄຳຕອບ
              </div>
            </div>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full bg-blue-50 rounded-xl shadow-lg p-6 rotate-y-180 backface-hidden">
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-center mb-8">
                {cards[currentIndex].answer}
              </p>
              
              {/* Score Buttons */}
              <div className="absolute bottom-4 flex gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScore(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 rounded-lg"
                >
                  <ThumbsDown className="w-4 h-4" />
                  ບໍ່ຖືກ
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleScore(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg"
                >
                  <ThumbsUp className="w-4 h-4" />
                  ຖືກ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-sm text-gray-500">
          {currentIndex + 1} / {cards.length}
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <RotateCw className="w-6 h-6" />
        </button>
        <button
          onClick={shuffleCards}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Shuffle className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default FlashCard;