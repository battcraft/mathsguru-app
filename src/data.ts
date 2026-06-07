// MathsGuru AI - Auto-generated from screens.json
export interface Screen { id: string; title: string; file: string; }
export interface Subtopic { id: string; name: string; screens: Screen[]; }
export interface Topic { id: string; name: string; subtopics: Subtopic[]; }
export interface Badge { id: string; name: string; icon: string; description: string; requirement: number; }
export interface StorySlide { id: number; emoji: string; title: string; narration: string; choices: { text: string; correct: boolean }[]; }
export interface QuizQuestion { id: string; question: string; options: string[]; correct: number; hint: string; }
export interface UserStats { xp: number; streak: number; screensViewed: Set<string>; completedScreens: Set<string>; badges: string[]; quizScores: Record<string, {score: number; total: number}>; }

export const TOPICS: Topic[] = [
  // ═══════════════════════════════════════════════════════════════
  // TOPIC 1: GEOMETRY - Rekha & Bindu (Points, Lines, Rays, Segments)
  // 5-Pillar Model: Video → Explainer → Practice → Panga → Mastery
  // ═══════════════════════════════════════════════════════════════
  {
    id: "geometry",
    name: "📏 Geometry: Rekha & Bindu",
    subtopics: [
      // ── PILLAR 1: Video Masterclass ──────────────────────────
      { id: "videos", name: "🎬 Video Lessons", screens: [
        { id: "95fc95b0f3fa4d63a0c548620fa9be5e", title: "Video Lesson: Point (Bindu)", file: "/screens/95fc95b0f3fa4d63a0c548620fa9be5e.html" },
        { id: "b0110ccbf115477ba8e9493419846e5b", title: "Video Lesson: The History of Zero & Bindu", file: "/screens/b0110ccbf115477ba8e9493419846e5b.html" },
        { id: "47b07cb80838484c8074e9f66678e341", title: "Video Lesson: Ray vs. Laser", file: "/screens/47b07cb80838484c8074e9f66678e341.html" },
      ] },
      // ── PILLAR 2: Concept Explainer ─────────────────────────
      { id: "point", name: "💡 Bindu (Point)", screens: [
        { id: "519f4332edf243309de64ab9f295a91a", title: "Geometry: Rekha & Bindu - What is a Point?", file: "/screens/519f4332edf243309de64ab9f295a91a.html" },
        { id: "432c1271ccd242839f50db14a9653da3", title: "Geometry: Rekha & Bindu - Point Explainer", file: "/screens/432c1271ccd242839f50db14a9653da3.html" },
        { id: "121ee8d9f2b344d3969f1cdcd8d16d78", title: "Geometry: Rekha & Bindu - Points in Nature", file: "/screens/121ee8d9f2b344d3969f1cdcd8d16d78.html" },
        { id: "6a0638771b574b8198a83df9b67064c1", title: "Geometry: Rekha & Bindu - Points in Space", file: "/screens/6a0638771b574b8198a83df9b67064c1.html" },
        { id: "809e8286b5ba406c9a432c622f122ea7", title: "Geometry: Rekha & Bindu - Naming Points", file: "/screens/809e8286b5ba406c9a432c622f122ea7.html" },
        { id: "8fca9b3822704f2db1db5a86f71dcf1a", title: "Geometry: The Capital Rule", file: "/screens/8fca9b3822704f2db1db5a86f71dcf1a.html" },
        { id: "5581b13444de4752ba901268a950530c", title: "Expert Level: The Point (Bindu)", file: "/screens/5581b13444de4752ba901268a950530c.html" },
      ] },
      { id: "line", name: "💡 Rekha (Line)", screens: [
        { id: "db6e1236ddb64627aaacc6f9408a2fa4", title: "Geometry: Rekha & Bindu - Line", file: "/screens/db6e1236ddb64627aaacc6f9408a2fa4.html" },
        { id: "e4d3c0ce14e34143b8d058b64a955dce", title: "Geometry: Rekha & Bindu - Line", file: "/screens/e4d3c0ce14e34143b8d058b64a955dce.html" },
        { id: "dac057946c7841db8da18afa4cf339a4", title: "Geometry: Rekha & Bindu - Line Expert", file: "/screens/dac057946c7841db8da18afa4cf339a4.html" },
        { id: "dfadc902479043f3b3fa7a7405409c35", title: "Rekha: The Infinite Traveler", file: "/screens/dfadc902479043f3b3fa7a7405409c35.html" },
        { id: "85b062a708e941ce85dbe6e66b99cbe4", title: "Ganit Pop - Infinite Lines", file: "/screens/85b062a708e941ce85dbe6e66b99cbe4.html" },
        { id: "432a36e1b9a742eeb9206666aa86ba2f", title: "Lines in the City - Ganit Pop", file: "/screens/432a36e1b9a742eeb9206666aa86ba2f.html" },
        { id: "76ce0c965f754ca5b3c8d83b93f49e61", title: "Lines in Space - Ganit Dost", file: "/screens/76ce0c965f754ca5b3c8d83b93f49e61.html" },
        { id: "efe4f34bd7db4c859cad402506ac099e", title: "Naming Your Lines - Ganit Pop", file: "/screens/efe4f34bd7db4c859cad402506ac099e.html" },
        { id: "6be7168ee6bc45cc942cd4b79d6787f1", title: "Parallel vs Perpendicular | Ganit Dost", file: "/screens/6be7168ee6bc45cc942cd4b79d6787f1.html" },
        { id: "c28709a72654485bab41621af23ab406", title: "Socho: Can a Line be Curved?", file: "/screens/c28709a72654485bab41621af23ab406.html" },
      ] },
      { id: "segment", name: "💡 Khand (Segment)", screens: [
        { id: "e1798591d55e44a1bf48a30e32ac555c", title: "Line Segment: The Fixed Path", file: "/screens/e1798591d55e44a1bf48a30e32ac555c.html" },
        { id: "490714e4a7234a4c854485af4b6f70cc", title: "Ganit Pop - Line Segment: Measuring Length", file: "/screens/490714e4a7234a4c854485af4b6f70cc.html" },
        { id: "a7f3853f4bd24c7c8084dd207629abe5", title: "Line Segment vs Ray", file: "/screens/a7f3853f4bd24c7c8084dd207629abe5.html" },
        { id: "46e06fc5f08148f38bd01e7882dd666e", title: "Line Segment: Subsets of a Line (Expert)", file: "/screens/46e06fc5f08148f38bd01e7882dd666e.html" },
      ] },
      { id: "ray", name: "💡 Kiran (Ray)", screens: [
        { id: "0b97313fb9b54fab9aa9562df60c56c9", title: "Ray (Kiran): One-Way Hero!", file: "/screens/0b97313fb9b54fab9aa9562df60c56c9.html" },
        { id: "e24f803ff17a423fafb27dc889129546", title: "Ray: The One-Way Hero", file: "/screens/e24f803ff17a423fafb27dc889129546.html" },
        { id: "6866ed386cf9439a8576d8ec347c9005", title: "Kiran Ka Masterclass - Rays", file: "/screens/6866ed386cf9439a8576d8ec347c9005.html" },
        { id: "58e3eeefba8a47c69485958218021630", title: "Ray: Naming the Kiran", file: "/screens/58e3eeefba8a47c69485958218021630.html" },
        { id: "30247ac1eb4a450fada80ec4284eab47", title: "Angle or Ray? - Ganit Dost", file: "/screens/30247ac1eb4a450fada80ec4284eab47.html" },
        { id: "c8d3351704a14d27a072409639f6cebc", title: "Ganit Dost - Ray Directionality Speed-Run", file: "/screens/c8d3351704a14d27a072409639f6cebc.html" },
        { id: "2384f8363c8840f99cfb670a06848b9e", title: "Challenge: Sun Rays vs Laser", file: "/screens/2384f8363c8840f99cfb670a06848b9e.html" },
        { id: "372bb6e9fecc4891b2a3c55ba28a52b0", title: "Ray: The Endless Arrow (Expert)", file: "/screens/372bb6e9fecc4891b2a3c55ba28a52b0.html" },
      ] },
      { id: "vertex", name: "💡 Shikhar (Vertex)", screens: [
        { id: "00693e0549f546f3979a53a782510f1b", title: "Geometry: Rekha & Bindu - The Starting Point (Vertex)", file: "/screens/00693e0549f546f3979a53a782510f1b.html" },
        { id: "1eeaefb8e7fa496cabc2554d1e1f9144", title: "Find the Vertex! - Ganit Pop", file: "/screens/1eeaefb8e7fa496cabc2554d1e1f9144.html" },
        { id: "6f009c6a030e4286a09529bd8ef1736d", title: "Ganit Dost - Vertex Collector", file: "/screens/6f009c6a030e4286a09529bd8ef1736d.html" },
        { id: "ceac26045bcf4e1f8fe61692b836ee5f", title: "Ganit Pop - Vertex vs Endpoints", file: "/screens/ceac26045bcf4e1f8fe61692b836ee5f.html" },
      ] },
      // ── PILLAR 3: Practice Zone ──────────────────────────────
      { id: "practice", name: "🏋️ Practice Zone", screens: [
        { id: "7aaaa747f14340919e4242ab524e8417", title: "Geometry: Rekha & Bindu - Points on a Line", file: "/screens/7aaaa747f14340919e4242ab524e8417.html" },
        { id: "ce6feb3d6425441e9741dc55774b2d7b", title: "Geometry: Rekha & Bindu - Points on a Segment", file: "/screens/ce6feb3d6425441e9741dc55774b2d7b.html" },
        { id: "dc67e5afcb8349aaac716e0d5e2f5c8a", title: "Line Hunt - Dhoondh Re Lines Ko!", file: "/screens/dc67e5afcb8349aaac716e0d5e2f5c8a.html" },
        { id: "7ea0d212993d4dad8c5fd1ed93fea9c3", title: "Geometry Practice - Bindu dhundo!", file: "/screens/7ea0d212993d4dad8c5fd1ed93fea9c3.html" },
        { id: "701ecaeb2db94c4ba7862764036f6e12", title: "Point Hunt: City Search", file: "/screens/701ecaeb2db94c4ba7862764036f6e12.html" },
        { id: "71d0c77ebc1d4024a94d0c4ad3c3909e", title: "Ganit Dost - Street Map Point Hunt", file: "/screens/71d0c77ebc1d4024a94d0c4ad3c3909e.html" },
        { id: "1f326abf920f481e8ca9b87a6122751d", title: "Practice: Segment Hunt (Beginner)", file: "/screens/1f326abf920f481e8ca9b87a6122751d.html" },
        { id: "edeb15fbeec64826bf5e12fb4de05a51", title: "Practice Zone - Ray Hunter", file: "/screens/edeb15fbeec64826bf5e12fb4de05a51.html" },
        { id: "19f6aedc71764a8b9d8d44b63cccab90", title: "Practice: Ray Direction (Intermediate)", file: "/screens/19f6aedc71764a8b9d8d44b63cccab90.html" },
        { id: "1756d215ffaa437cb11b2e1cb2fc34bf", title: "Matchstick Math - Line Segment", file: "/screens/1756d215ffaa437cb11b2e1cb2fc34bf.html" },
        { id: "3cffc7208c4d4ffda4a936ebde0fa9d1", title: "Ganit Dost - Segment Symmetry", file: "/screens/3cffc7208c4d4ffda4a936ebde0fa9d1.html" },
        { id: "f7e18d7f4011491b85bfd76754d741dd", title: "Segment Ruler Challenge - Ganit Pop", file: "/screens/f7e18d7f4011491b85bfd76754d741dd.html" },
        { id: "0cb62eebec364b80a4b650030b1bb755", title: "Line Symbols Match", file: "/screens/0cb62eebec364b80a4b650030b1bb755.html" },
      ] },
      // ── PILLAR 4: Kahani (Story) ─────────────────────────────
      { id: "stories", name: "📖 Kahani (Story)", screens: [
        { id: "0f311102e0944c72847b4c0cbc1c93aa", title: "Geometry: Rekha & Bindu - Story", file: "/screens/0f311102e0944c72847b4c0cbc1c93aa.html" },
        { id: "ff679af909c5451395241ad1ecaa0925", title: "Kahani - Tara Ki Udaan (Point)", file: "/screens/ff679af909c5451395241ad1ecaa0925.html" },
        { id: "278e78a9631f4e2f801b721fd10e39e5", title: "Kahani - Jaadui Bindu (Vertex)", file: "/screens/278e78a9631f4e2f801b721fd10e39e5.html" },
        { id: "89d5748a061845ee8609a2db163a87c3", title: "Kahani Mode: Ray", file: "/screens/89d5748a061845ee8609a2db163a87c3.html" },
        { id: "ba62308d51734fe38fb0ccbd0e80d553", title: "Kahani - Number Line Race", file: "/screens/ba62308d51734fe38fb0ccbd0e80d553.html" },
      ] },
      // ── PILLAR 5: Panga (Quiz) + Mastery ─────────────────────
      { id: "quizzes", name: "🎯 Panga (Quiz)", screens: [
        { id: "b304fd5fdee84f47afc210a321adca09", title: "Geometry Quiz", file: "/screens/b304fd5fdee84f47afc210a321adca09.html" },
        { id: "41b3ca60303a42ebb51da2db7abaf21a", title: "Geometry Grand Panga", file: "/screens/41b3ca60303a42ebb51da2db7abaf21a.html" },
        { id: "f62c07bd4a4c48b392aa4326b3ed0ecf", title: "Expert Panga: Geometry Master", file: "/screens/f62c07bd4a4c48b392aa4326b3ed0ecf.html" },
        { id: "40c0eae4bb44466cbbde1b0524c99057", title: "Geometry: Intersections", file: "/screens/40c0eae4bb44466cbbde1b0524c99057.html" },
        { id: "09486f02607e46d4bfe1afba89bc15f4", title: "Geometry: The Big Comparison", file: "/screens/09486f02607e46d4bfe1afba89bc15f4.html" },
      ] },
      { id: "mastery", name: "🏆 Mastery Celebration", screens: [
        { id: "c317693ba4b248f7b99e903c3d799ad6", title: "The Rekha-Bindu Legend - Mastery Recap", file: "/screens/c317693ba4b248f7b99e903c3d799ad6.html" },
        { id: "0e938621f05846868a41a7d28d467fa0", title: "Geometry Champion Board", file: "/screens/0e938621f05846868a41a7d28d467fa0.html" },
      ] },
      { id: "skills", name: "🔧 Geometry Skills", screens: [
        { id: "390f5e98a6dd4d089c046654558aade7", title: "Practice Zone - Coordinate Crossword", file: "/screens/390f5e98a6dd4d089c046654558aade7.html" },
        { id: "eccd3132ddb9458fba2cc7587a25f362", title: "Practice Zone - Scale Reading", file: "/screens/eccd3132ddb9458fba2cc7587a25f362.html" },
        { id: "44e0f4eaf6314354bca7837126dbfe30", title: "Ganit Pop - Scale Master", file: "/screens/44e0f4eaf6314354bca7837126dbfe30.html" },
        { id: "0167ee6af6774ebebcf059d9d55f9d13", title: "Measuring in Real Life - Ganit Pop", file: "/screens/0167ee6af6774ebebcf059d9d55f9d13.html" },
        { id: "2b63613e8bde499c9c431cf705bd5a5c", title: "Ruler Error Catch", file: "/screens/2b63613e8bde499c9c431cf705bd5a5c.html" },
        { id: "8d932e8fc84a43388a6b8082b2ab4436", title: "Railway Track Matchup - Ganit Dost", file: "/screens/8d932e8fc84a43388a6b8082b2ab4436.html" },
        { id: "02fcb9e0e73547888e4625f1d5c896f3", title: "The Invisible Grid - Ganit Dost", file: "/screens/02fcb9e0e73547888e4625f1d5c896f3.html" },
      ] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TOPIC 2: MAX/MIN - Maximum, Minimum, and Range
  // ═══════════════════════════════════════════════════════════════
  {
    id: "maxmin",
    name: "🔍 Max/Min - Maximum, Minimum & Range",
    subtopics: [
      // ── PILLAR 1: Video Masterclass ──────────────────────────
      { id: "videos", name: "🎬 Video Lessons", screens: [
        { id: "188fd0aee13a4b83b1c4e7a1437e865f", title: "Max/Min Video 1: IPL Dhamaka", file: "/screens/188fd0aee13a4b83b1c4e7a1437e865f.html" },
        { id: "f9d315599ff64ea193d470cb75a83342", title: "Max/Min Video 2: Samosa Party", file: "/screens/f9d315599ff64ea193d470cb75a83342.html" },
        { id: "0717b1b17b42450794813a60ee1e0603", title: "Max/Min Video 3: Real World Applications", file: "/screens/0717b1b17b42450794813a60ee1e0603.html" },
        { id: "45e744e2076c43519a87d128158418f3", title: "Math-Masti - Max/Min Video Lesson", file: "/screens/45e744e2076c43519a87d128158418f3.html" },
      ] },
      // ── PILLAR 2: Concept Explainer ─────────────────────────
      { id: "maximum", name: "💡 Maximum (Sabse Bada)", screens: [
        { id: "fc63965d66904bb6a7775ac4506cf4c5", title: "Maximum: Sabse Bada Kaun?", file: "/screens/fc63965d66904bb6a7775ac4506cf4c5.html" },
        { id: "bb35473c3e0045d69f96fad0e082aea0", title: "Maximum & Minimum Intro", file: "/screens/bb35473c3e0045d69f96fad0e082aea0.html" },
        { id: "20788723b73a40888b4f74779d11cd54", title: "Ganit Dost - Maximum & Minimum Lesson", file: "/screens/20788723b73a40888b4f74779d11cd54.html" },
        { id: "1069ee7770b24c5fa5dc0075e253d0b5", title: "Ganit Dost - Maximum & Minimum", file: "/screens/1069ee7770b24c5fa5dc0075e253d0b5.html" },
        { id: "e8efc39f87ca46348e4faf962e835878", title: "Ganit Dost - Maximum & Minimum Practice", file: "/screens/e8efc39f87ca46348e4faf962e835878.html" },
        { id: "f6860f2742f1462cbd69e6a135ae5b56", title: "Ganit Dost - Minimum vs Maximum", file: "/screens/f6860f2742f1462cbd69e6a135ae5b56.html" },
        { id: "ac492ae364d24e25bd8a9cb158304cb2", title: "Ganit Dost - Grocery List Max/Min", file: "/screens/ac492ae364d24e25bd8a9cb158304cb2.html" },
        { id: "ff657683e28e4c95b9bd9c3e08844c46", title: "Max Matlab Sabse Bada", file: "/screens/ff657683e28e4c95b9bd9c3e08844c46.html" },
        { id: "f418283912d74ced84709bbd49b45dd4", title: "Temperature Tracker - Ganit Pop", file: "/screens/f418283912d74ced84709bbd49b45dd4.html" },
        { id: "138295dca01b4f98bc1960a2a7e8c4bc", title: "Ganit Pop - Max/Min in Nature", file: "/screens/138295dca01b4f98bc1960a2a7e8c4bc.html" },
      ] },
      { id: "minimum", name: "💡 Minimum (Sabse Chhota)", screens: [
        { id: "0b9aa929160f4e0eb8923e4119ecf9eb", title: "Ganit Dost - Minimum Explainer", file: "/screens/0b9aa929160f4e0eb8923e4119ecf9eb.html" },
        { id: "674ef43f9d8844c7b10da7c80c0f361c", title: "Interactive Explainer: Min matlab Sabse Kam", file: "/screens/674ef43f9d8844c7b10da7c80c0f361c.html" },
      ] },
      { id: "range", name: "💡 Range (Fasla)", screens: [
        { id: "0214b260a2bf40119ce6eff72a57b21d", title: "Ganit Dost - Range Explainer", file: "/screens/0214b260a2bf40119ce6eff72a57b21d.html" },
        { id: "dc00161c107f4482acd18c198f984b0b", title: "The Range Mystery", file: "/screens/dc00161c107f4482acd18c198f984b0b.html" },
        { id: "8882903e96a24fbc848c387e3706ad06", title: "Mastering Range - Ganit Pop", file: "/screens/8882903e96a24fbc848c387e3706ad06.html" },
        { id: "aa849749bef440f097e25d456f761f60", title: "Range Finder: Gap Nikalo!", file: "/screens/aa849749bef440f097e25d456f761f60.html" },
      ] },
      // ── PILLAR 3: Practice Zone ──────────────────────────────
      { id: "practice", name: "🏋️ Practice Zone", screens: [
        { id: "cdab882edbff42de9076da4e9bccba6f", title: "Math-Masti: Data Log Max/Min Challenge", file: "/screens/cdab882edbff42de9076da4e9bccba6f.html" },
        { id: "b3649855c6ba4bab8baf0c56732a700e", title: "Range Practice - Math-Masti", file: "/screens/b3649855c6ba4bab8baf0c56732a700e.html" },
        { id: "83895bd6efc449f591f88d6002ed3da3", title: "Panga 1: IPL Score", file: "/screens/83895bd6efc449f591f88d6002ed3da3.html" },
        { id: "64518e48a9e443d8b8b03fba6543000b", title: "Panga 2: Cold Drinks", file: "/screens/64518e48a9e443d8b8b03fba6543000b.html" },
        { id: "fbecddc12e0345b7944d978bbe7b1763", title: "Panga 3: Temperature Mix", file: "/screens/fbecddc12e0345b7944d978bbe7b1763.html" },
        { id: "649794ee52aa4e47a3ab06f0af433968", title: "Mini Panga! - Mid-Lesson Quiz", file: "/screens/649794ee52aa4e47a3ab06f0af433968.html" },
      ] },
      // ── PILLAR 4: Kahani (Story) ─────────────────────────────
      { id: "stories", name: "📖 Kahani (Story)", screens: [
        { id: "1b7f20927ad84fd3bfa7d3e078d6afa5", title: "Kahani Mode - The King's Dilemma", file: "/screens/1b7f20927ad84fd3bfa7d3e078d6afa5.html" },
        { id: "7cf882ed35dd46dbb7b9ba245275520d", title: "Kahani: The Kings Dilemma", file: "/screens/7cf882ed35dd46dbb7b9ba245275520d.html" },
        { id: "e407f60d5601490b8c5e503c06237c0e", title: "Kahani: The Kings Dilemma", file: "/screens/e407f60d5601490b8c5e503c06237c0e.html" },
        { id: "ed5ce6fe8b9a48859519447ccdbdd2fb", title: "The King's Dilemma - Kahani Mode", file: "/screens/ed5ce6fe8b9a48859519447ccdbdd2fb.html" },
        { id: "fdbea8a42744419f893478d6d80d031b", title: "Math-Masti - The King's Dilemma", file: "/screens/fdbea8a42744419f893478d6d80d031b.html" },
        { id: "d33b849c09794c83be8616777f45b0ce", title: "The Longest Road - Kahani Mode", file: "/screens/d33b849c09794c83be8616777f45b0ce.html" },
      ] },
      // ── PILLAR 5: Panga (Quiz) + Mastery ─────────────────────
      { id: "quizzes", name: "🎯 Panga (Quiz)", screens: [
        { id: "230758b7c53f4cc38ef5093f63c7dcb9", title: "Final Panga! - Max/Min", file: "/screens/230758b7c53f4cc38ef5093f63c7dcb9.html" },
        { id: "0a61c38c2caf48778a2b50e58b063f28", title: "Math-Masti | Max/Min Mastery", file: "/screens/0a61c38c2caf48778a2b50e58b063f28.html" },
        { id: "cee1128305224ff788e02e115362946a", title: "Math-Masti | Max/Min Mastery", file: "/screens/cee1128305224ff788e02e115362946a.html" },
        { id: "20a5664ca67748c8a3544e1673118a94", title: "Ganit Dost - Socho Challenge", file: "/screens/20a5664ca67748c8a3544e1673118a94.html" },
        { id: "b5969bb7d23d4ddf80b9d0b01fc29feb", title: "Ganit Dost - Hard Mode Challenge", file: "/screens/b5969bb7d23d4ddf80b9d0b01fc29feb.html" },
      ] },
      { id: "mastery", name: "🏆 Mastery Celebration", screens: [
        { id: "c8276257f8714bc683afd8388888a367", title: "Module Mastery - Maximum & Minimum", file: "/screens/c8276257f8714bc683afd8388888a367.html" },
        { id: "c64ec0e82e8c4619b93e62c2f0dec3b5", title: "Max/Min: Section Success", file: "/screens/c64ec0e82e8c4619b93e62c2f0dec3b5.html" },
      ] },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TOPIC 3: COMPARING NUMBERS - Decimals, Place Value, Order, Rounding
  // ═══════════════════════════════════════════════════════════════
  {
    id: "numbers",
    name: "🔢 Comparing Numbers",
    subtopics: [
      // ── PILLAR 1: Video Masterclass ──────────────────────────
      { id: "videos", name: "🎬 Video Lessons", screens: [
        { id: "cc1ae66ce0184c5bad1e7e2330674bbb", title: "Summary Video", file: "/screens/cc1ae66ce0184c5bad1e7e2330674bbb.html" },
      ] },
      // ── PILLAR 2: Concept Explainer ─────────────────────────
      { id: "intro", name: "💡 Comparing Basics", screens: [
        { id: "c70f4203b16647608fb3137e361f5247", title: "Comparing Numbers: Intro", file: "/screens/c70f4203b16647608fb3137e361f5247.html" },
        { id: "79962af76a4141e3ad0220552ef2437c", title: "Kaise Compare karte hain?", file: "/screens/79962af76a4141e3ad0220552ef2437c.html" },
        { id: "41e8a0f7dddd472d80cbead29f7e2786", title: "Crocodile vs Big Numbers - Ganit Pop", file: "/screens/41e8a0f7dddd472d80cbead29f7e2786.html" },
        { id: "0ec4c87c4f024146bcb10d10578210b2", title: "Speed Comparison Masterclass - Ganit Dost", file: "/screens/0ec4c87c4f024146bcb10d10578210b2.html" },
        { id: "2946d07dcb844ddc9b5226942256ab96", title: "Numbers Ka Ustad!", file: "/screens/2946d07dcb844ddc9b5226942256ab96.html" },
        { id: "af954328553343c3876a0f5050a3610c", title: "Negative Number Battle - Ganit Dost", file: "/screens/af954328553343c3876a0f5050a3610c.html" },
        { id: "3947fe676dad4fd5b3e320731a54f45c", title: "Expert Challenge: The Negative Zone", file: "/screens/3947fe676dad4fd5b3e320731a54f45c.html" },
      ] },
      { id: "decimals", name: "💡 Decimals", screens: [
        { id: "12530fda6def43468f3e97608172d384", title: "Comparing Decimals - MathsGuru", file: "/screens/12530fda6def43468f3e97608172d384.html" },
        { id: "d8e05e417ce54b998c22d922f1029e9a", title: "Decimal Duel - Kaun Bada?", file: "/screens/d8e05e417ce54b998c22d922f1029e9a.html" },
        { id: "06dfc56c489e4f29bf24801fe626e39d", title: "Decimal Speed Drill - Ganit Pop", file: "/screens/06dfc56c489e4f29bf24801fe626e39d.html" },
        { id: "b774f87682ea43ad8c758a4b1025876a", title: "The Infinity of Decimals", file: "/screens/b774f87682ea43ad8c758a4b1025876a.html" },
      ] },
      { id: "rounding", name: "💡 Rounding", screens: [
        { id: "99512d0893ee4979804904207786cfb1", title: "Rounding ka Akhada!", file: "/screens/99512d0893ee4979804904207786cfb1.html" },
        { id: "173050b80a2042c89f4590ffe571fee4", title: "Rounding Arena - Math-Masti", file: "/screens/173050b80a2042c89f4590ffe571fee4.html" },
        { id: "f301b00aa9ca46f789fa0daf8870efe9", title: "Rounding in the Real World", file: "/screens/f301b00aa9ca46f789fa0daf8870efe9.html" },
      ] },
      { id: "place_value", name: "💡 Place Value", screens: [
        { id: "ae4e6d7bc2f34e58a8a68b6dc7183f60", title: "Ganit Pop - Place Value Power", file: "/screens/ae4e6d7bc2f34e58a8a68b6dc7183f60.html" },
        { id: "af39bb9e57684acda413a71a700b3392", title: "Comparing 5-Digit Numbers", file: "/screens/af39bb9e57684acda413a71a700b3392.html" },
      ] },
      { id: "order", name: "💡 Order (Kram)", screens: [
        { id: "b1ea3ab38c284e3eb54f6f204f5dfadf", title: "Order Masterclass", file: "/screens/b1ea3ab38c284e3eb54f6f204f5dfadf.html" },
        { id: "12482b95f0bf44b09222aaf0cc4a684c", title: "Descending Order Relay", file: "/screens/12482b95f0bf44b09222aaf0cc4a684c.html" },
        { id: "7b3a7320639d421c8f3ce2a42616b853", title: "Ganit Dost - Order the Planets", file: "/screens/7b3a7320639d421c8f3ce2a42616b853.html" },
        { id: "68d5608ae4e14f71a67ca2377ccaa614", title: "Math-Masti | Ascending Order Relay", file: "/screens/68d5608ae4e14f71a67ca2377ccaa614.html" },
      ] },
      // ── PILLAR 3: Practice Zone ──────────────────────────────
      { id: "practice", name: "🏋️ Practice Zone", screens: [
        { id: "174abf2e403947dbbe372e25a3e38a07", title: "Decimal Duel - Practice", file: "/screens/174abf2e403947dbbe372e25a3e38a07.html" },
        { id: "08df6838913341d8bdade2dcaf0ce9f7", title: "Speed Compare Drill", file: "/screens/08df6838913341d8bdade2dcaf0ce9f7.html" },
        { id: "90cc8a7116f341de99787083e80c70ae", title: "Symbol Speed Drill", file: "/screens/90cc8a7116f341de99787083e80c70ae.html" },
        { id: "edb30a8d279042a0ab52dcfe706ec0b1", title: "Strike Rate Sprint", file: "/screens/edb30a8d279042a0ab52dcfe706ec0b1.html" },
        { id: "1f69ba49f6e24fdeb941329e85ac4bba", title: "Dimaag ki Batti Jalao! - Active Recall", file: "/screens/1f69ba49f6e24fdeb941329e85ac4bba.html" },
        { id: "f5148780fab648399f16da1714596842", title: "Geometry: Rekha & Bindu - Socho", file: "/screens/f5148780fab648399f16da1714596842.html" },
      ] },
      // ── PILLAR 4: Kahani (Story) ─────────────────────────────
      { id: "stories", name: "📖 Kahani (Story)", screens: [
        { id: "e2bb30bb259340baa58d9d5031a4ec5c", title: "Tara Ki Kahani", file: "/screens/e2bb30bb259340baa58d9d5031a4ec5c.html" },
        { id: "a482666d667d4e22a8c849eaead33a9e", title: "The Broken Bridge - Ganit Dost", file: "/screens/a482666d667d4e22a8c849eaead33a9e.html" },
        { id: "26e6139022314cb28508dfb09b244429", title: "Comparing Money - Ganit Pop", file: "/screens/26e6139022314cb28508dfb09b244429.html" },
      ] },
      // ── PILLAR 5: Panga (Quiz) + Mastery ─────────────────────
      { id: "quizzes", name: "🎯 Panga (Quiz)", screens: [
        { id: "1cdf1a8bc96542ceb1f82d6d64f233a0", title: "Math-Masti | Numbers Master Quiz", file: "/screens/1cdf1a8bc96542ceb1f82d6d64f233a0.html" },
        { id: "db243691f2b14322ba3548ff3f3d3c54", title: "Numbers Ka Final Panga!", file: "/screens/db243691f2b14322ba3548ff3f3d3c54.html" },
        { id: "c829a13444514785b86d0193f1827e76", title: "Numbers Panga! - Evaluation", file: "/screens/c829a13444514785b86d0193f1827e76.html" },
        { id: "635630cd49ff4c8dbc2afae804a8019d", title: "Expert Panga - Comparing Numbers", file: "/screens/635630cd49ff4c8dbc2afae804a8019d.html" },
        { id: "52e8966b96f14cc59d7ca6308a04f306", title: "Mid-Lesson Panga!", file: "/screens/52e8966b96f14cc59d7ca6308a04f306.html" },
        { id: "39eb8dab246444e3ac842f1420a872b2", title: "Ganit Pop - Mid-Lesson Panga!", file: "/screens/39eb8dab246444e3ac842f1420a872b2.html" },
        { id: "816a8f3e8a6e4f35901c61b451765ab7", title: "Math-Masti - Mid-Lesson Panga!", file: "/screens/816a8f3e8a6e4f35901c61b451765ab7.html" },
        { id: "77c569329f9648d994d205d83c605d0d", title: "Math-Masti | Mid-Lesson Quiz", file: "/screens/77c569329f9648d994d205d83c605d0d.html" },
        { id: "23fbd256c9f346e193c67bbbc1f7a41a", title: "Final Panga!", file: "/screens/23fbd256c9f346e193c67bbbc1f7a41a.html" },
        { id: "62e499ab527347dabf548b2689fb2f49", title: "Final Panga! - Ganit Pop", file: "/screens/62e499ab527347dabf548b2689fb2f49.html" },
        { id: "01067e29f6e9463fad7af0bec78fe869", title: "Final Panga! - Math Assessment", file: "/screens/01067e29f6e9463fad7af0bec78fe869.html" },
        { id: "3c94e89095604fafa062da71b932943c", title: "Math-Masti Final Panga!", file: "/screens/3c94e89095604fafa062da71b932943c.html" },
        { id: "4cce43de589345f3a4ff3dae0a68b1ce", title: "Asli Panga: Final Test", file: "/screens/4cce43de589345f3a4ff3dae0a68b1ce.html" },
        { id: "0d2f4a04774f4117a693698a37ffc672", title: "Final Evaluation - Ganit Dost", file: "/screens/0d2f4a04774f4117a693698a37ffc672.html" },
        { id: "4c6868d20b33400abec8748989d8ab77", title: "Topper's Challenge!", file: "/screens/4c6868d20b33400abec8748989d8ab77.html" },
      ] },
      { id: "mastery", name: "🏆 Mastery Celebration", screens: [
        { id: "ecaacac15a484ccb8209f28860e72fd1", title: "Mastery Summary - Comparing Numbers", file: "/screens/ecaacac15a484ccb8209f28860e72fd1.html" },
        { id: "a6f44a18b8b2439cb738ba5384136082", title: "Module Mastery - Numbers and Comparison", file: "/screens/a6f44a18b8b2439cb738ba5384136082.html" },
        { id: "3d861d92b6fc47a29efb92f2437a3ff2", title: "Comparison Champ Unlocked!", file: "/screens/3d861d92b6fc47a29efb92f2437a3ff2.html" },
      ] },
      { id: "skills", name: "🔧 Number Skills", screens: [
        { id: "4103a831082b453b8333a0cbacacb8cc", title: "MathsGuru - Important Symbols", file: "/screens/4103a831082b453b8333a0cbacacb8cc.html" },
        { id: "4154d2b029aa4d11b9fe66b9001b71fb", title: "MathsGuru - Interactive Worksheet", file: "/screens/4154d2b029aa4d11b9fe66b9001b71fb.html" },
        { id: "0ccc8ae32f034b0da436d929a788f903", title: "Data Collection Examples - MathsGuru", file: "/screens/0ccc8ae32f034b0da436d929a788f903.html" },
        { id: "c35e8f7100d74addac5482004b227a92", title: "Math-Masti | Approximation in the Kitchen", file: "/screens/c35e8f7100d74addac5482004b227a92.html" },
        { id: "21adc5b56d9c4faeb513c661c78d67d0", title: "Precision in Engineering", file: "/screens/21adc5b56d9c4faeb513c661c78d67d0.html" },
        { id: "e10f520201d141a4a63e4ed985fe82c2", title: "MathsGuru Worksheet - Maximum", file: "/screens/e10f520201d141a4a63e4ed985fe82c2.html" },
        { id: "514f1e0f7b1d4d1fb98150f122591c0e", title: "Ganit Pop - Practice Zone", file: "/screens/514f1e0f7b1d4d1fb98150f122591c0e.html" },
        { id: "b0460971c5a148fdacfab70bdc81a424", title: "Ganit Dost - Samosa Party", file: "/screens/b0460971c5a148fdacfab70bdc81a424.html" },
        { id: "cdad00b3c40d4a4d94000bae9e9315fe", title: "Practice Question 1 - IPL Score | Ganit Dost", file: "/screens/cdad00b3c40d4a4d94000bae9e9315fe.html" },
        { id: "fec114b3fbc047c892475fa6b02c3baa", title: "Ganit Dost - Practice Question 2", file: "/screens/fec114b3fbc047c892475fa6b02c3baa.html" },
        { id: "f36849c728c14cb18789ba117bb53ae5", title: "Ganit Dost - Practice Question 3", file: "/screens/f36849c728c14cb18789ba117bb53ae5.html" },
        { id: "6320432e61ed468abc1b03803a4299ee", title: "Practice Session - Ganit Dost", file: "/screens/6320432e61ed468abc1b03803a4299ee.html" },
      ] },
    ],
  },
]
  // ═══════════════════════════════════════════════════════════════
// VIDEO INTEGRATION MAP (from ~/workspace/mathsguru-videos/)
// Manim source files → Topic → Sub-topic
// bindu_proper.py        → Geometry → Bindu (Point)
// rekha_proper.py        → Geometry → Rekha (Line)
// kon_proper.py          → Geometry → Kon (Angle)
// koona_proper.py        → Geometry → Koona (Cone) [future]
// tritkon_proper.py      → Geometry → Triangle [future]
// parimiti_proper.py     → Geometry → Perimeter
// area_proper.py         → Geometry → Area
// samta_proper.py        → Numbers → Comparing Basics
// konjy_proper.py        → Geometry → Angle (advanced)
// chakrav_proper.py      → Geometry → Chakra (Circle) [future]
// 3d_proper.py           → Geometry → 3D Shapes
// ═══════════════════════════════════════════════════════════════

export const BADGES: Badge[] = [
  { id: "bazaar-master", name: "Bazaar Master", icon: "shopping_bag", description: "Score 80%+ in 5 quizzes", requirement: 5 },
  { id: "negative-champ", name: "Negative Champ", icon: "percent", description: "Master negative numbers", requirement: 3 },
  { id: "bullet-brain", name: "Bullet Brain", icon: "bolt", description: "Complete 10 screens in a day", requirement: 10 },
  { id: "kahani-karavan", name: "Kahani Karavan", icon: "auto_stories", description: "Complete 3 stories", requirement: 3 },
  { id: "geometry-guru", name: "Geometry Guru", icon: "hexagon", description: "Master all geometry topics", requirement: 68 },
  { id: "number-ninja", name: "Number Ninja", icon: "calculate", description: "Master comparing numbers", requirement: 32 },
  { id: "streak-star", name: "Streak Star", icon: "local_fire_department", description: "7-day streak", requirement: 7 },
  { id: "desi-explorer", name: "Desi Explorer", icon: "explore", description: "Try all 5 topics", requirement: 5 },
  { id: "algebra-ace", name: "Algebra Ace", icon: "functions", description: "Master algebra basics", requirement: 24 },
  { id: "panga-king", name: "Panga King", icon: "emoji_events", description: "Score 100% on any quiz", requirement: 1 },
]

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: "q1", question: "Sabse Chhota Number kaunsa hai?", options: ["-50", "-20", "0"], correct: 0, hint: "Minus me jitna bada number dikhta hai, utni chhoti value hoti hai!" },
  { id: "q2", question: "Comparing: 0.5 vs 0.45 -- kaun bada?", options: ["0.5", "0.45", "Dono equal"], correct: 0, hint: "Decimal me 0.5 = 0.50 > 0.45!" },
  { id: "q3", question: "Rounding: 67 ka nearest ten?", options: ["60", "70", "65"], correct: 1, hint: "67 is closer to 70!" },
  { id: "q4", question: "Order: Chhota se bada -- 3, 1, 4, 2?", options: ["1,2,3,4", "4,3,2,1", "1,3,2,4"], correct: 0, hint: "Ascending = chhota se bada!" },
  { id: "q5", question: "Negative number kyun chhota hota hai?", options: ["Less than zero", "Broken", "Mistake"], correct: 0, hint: "Negative = zero se neeche!" },
  { id: "q6", question: "Bindu (Point) Kaunsa Hai?", options: ["Infinite length", "Sirf position", "Do endpoints"], correct: 1, hint: "Bindu sirf ek exact location hai!" },
  { id: "q7", question: "Triangle me kitne vertices hain?", options: ["2", "3", "4"], correct: 1, hint: "Triangle = 3 vertices!" },
  { id: "q8", question: "Rekha (Line) kitni lambi hoti hai?", options: ["10 cm", "Infinite", "50 cm"], correct: 1, hint: "Line dono taraf infinity tak!" },
  { id: "q9", question: "Khand (Segment) me kitne endpoints?", options: ["0", "1", "2"], correct: 2, hint: "Segment ke 2 fixed endpoints!" },
  { id: "q10", question: "Kiran (Ray) kis direction me jaati hai?", options: ["Dono taraf", "Sirf ek taraf", "Nahi jaati"], correct: 1, hint: "Ray ek taraf infinity tak!" },
  { id: "q11", question: "Cricket: 45, 67, 23, 89, 56. Maximum?", options: ["45", "89", "67"], correct: 1, hint: "89 sabse bada hai!" },
  { id: "q12", question: "Minimum kya hai? 12, 8, 15, 3, 20", options: ["12", "3", "8"], correct: 1, hint: "3 sabse chhota hai!" },
  { id: "q13", question: "Range = Max - Min. Range of (5, 10, 15)?", options: ["10", "5", "15"], correct: 0, hint: "15 - 5 = 10!" },
  { id: "q14", question: "Mean of 10, 20, 30, 40, 50?", options: ["25", "30", "35"], correct: 1, hint: "150/5 = 30!" },
  { id: "q15", question: "Sabse bada decimal: 0.9, 0.89, 0.91?", options: ["0.9", "0.91", "0.89"], correct: 1, hint: "0.91 > 0.90 > 0.89!" },
  { id: "q16", question: "Data Collection kya hai?", options: ["Jaankari ikattha karna", "Math question", "Padhai"], correct: 0, hint: "Data = info ikattha karna!" },
  { id: "q17", question: "Bar Graph me kya hota hai?", options: ["Rectangular bars", "Dots", "Circles"], correct: 0, hint: "Bar graph me bars hote hain!" },
  { id: "q18", question: "Scale: 1 unit = 5cm. 3 units?", options: ["10cm", "15cm", "20cm"], correct: 1, hint: "3 x 5 = 15 cm!" },
  { id: "q19", question: "Coordinate (3,4) me x kya hai?", options: ["4", "3", "7"], correct: 1, hint: "First = x, Second = y!" },
  { id: "q20", question: "Parallel lines kabhi milti hain?", options: ["Haan", "Nahi", "Kabhi kabhi"], correct: 1, hint: "Parallel = same distance forever!" },
  { id: "q21", question: "Agar x = 5, toh x + 3 = ?", options: ["8", "7", "6"], correct: 0, hint: "5 + 3 = 8!" },
  { id: "q22", question: "2x matlab kya hai?", options: ["x + x", "2 + x", "x / 2"], correct: 0, hint: "2x = 2 multiplied by x!" },
  { id: "q23", question: "x + 7 = 12 me x = ?", options: ["4", "5", "6"], correct: 1, hint: "12 - 7 = 5!" },
  { id: "q24", question: "3x - 6 = 9 me x = ?", options: ["3", "5", "2"], correct: 1, hint: "3x = 15, x = 5!" },
  { id: "q25", question: "Variable kya hai?", options: ["Unknown number", "Known value", "Answer"], correct: 0, hint: "Variable = value change ho sakti hai!" },
  { id: "q26", question: "Zero kis number se chhota hai?", options: ["Sab se", "Kisi se nahi", "Positive se"], correct: 0, hint: "Negative numbers zero se chhote!" },
  { id: "q27", question: "Descending me bada se chhota hota hai?", options: ["True", "False", "Kabhi nahi"], correct: 0, hint: "Descending = Bada to Chhota!" },
  { id: "q28", question: "90 degree angle = ?", options: ["Acute", "Right", "Obtuse"], correct: 1, hint: "90 = Right angle!" },
  { id: "q29", question: "Equation me = sign hota hai?", options: ["True", "False"], correct: 0, hint: "Equation hamesha = use karta hai!" },
  { id: "q30", question: "Samosa Rs 15, 3 samose = ?", options: ["30", "45", "60"], correct: 1, hint: "15 x 3 = 45!" },
]

export const STORY_SLIDES: StorySlide[] = [
  { id: 1, emoji: "🤔", title: "Chandni Chowk Ka Pehla Step!", narration: "MathsGuru Bhaiya Chandni Chowk mein ghoom rahe hain. Pehla stop: Mango Lassi! Sabse sasta dhundho!", choices: [
    { text: "Raju Lassi - Rs 80", correct: false },
    { text: "Bittu Sweets - Rs 55", correct: true },
    { text: "Royal Treat - Rs 110", correct: false },
  ] },
  { id: 2, emoji: "🤩", title: "Geometry Ka Challenge!", narration: "Ek shape banana hai. Bindu se shuruaat karo! Kaunsa element chahiye?", choices: [
    { text: "Rekha (Line)", correct: false },
    { text: "Khand (Segment)", correct: true },
    { text: "Kiran (Ray)", correct: false },
  ] },
  { id: 3, emoji: "😎", title: "Maximum Ka Raaz!", narration: "Cricket scores: 45, 67, 23, 89. Sabse bada score kaunsa hai?", choices: [
    { text: "45", correct: false },
    { text: "89", correct: true },
    { text: "67", correct: false },
  ] },
  { id: 4, emoji: "🎉", title: "Algebra Ka Pehla Kadam!", narration: "Mystery Bag me x chhupa hai. Agar x + 5 = 12, toh x = ?", choices: [
    { text: "5", correct: false },
    { text: "7", correct: true },
    { text: "12", correct: false },
  ] },
]

export const CHAT_TUTOR: Record<string, string> = {
  "bindu kya hai?": "Bindu (Point) sirf ek exact location hai! Pencil ka tip — na lamba, na chauda!",
  "rekha aur khand me kya fark hai?": "Rekha (Line) dono taraf infinity tak jaati hai! Khand (Segment) ke sirf 2 endpoints hain!",
  "maximum aur minimum kya hai?": "Maximum = sabse BADA! Minimum = sabse CHHOTA! Cricket me highest score = Maximum!",
  "decimals kaise compare karein?": "Decimals me digit by digit dekho! 0.5 > 0.45 kyunki 5 > 4 hai!",
  "negative number chhota kyun hota hai?": "Negative = zero se NEECHE! -5 < 0 < 5!",
  "algebra kya hai?": "Algebra me 'x' jaise variables = unknown values! Equation solve karo!",
  "equation kaise solve karein?": "x ko ALONE karo! Opposite operation lagao! x+5=12 means x=12-5=7!",
  "pattern kya hai?": "Pattern = repeat hone wala rule! 2,4,6,8... har baar 2 badh raha hai!",
}

export const DAILY_RIDDLES = [
  { question: "Number ko 3 se guna, phir 5 jodo = 20. Number kya hai?", options: ["5", "10", "15"], correct: 0 },
  { question: "Zero se chhota kaunsa number hai?", options: ["-10", "1", "0.5"], correct: 0 },
  { question: "Triangle me total angles kitne hote hain?", options: ["2", "3", "4"], correct: 1 },
  { question: "0.75 aur 0.8 -- kaunsa bada hai?", options: ["0.75", "0.8", "Dono equal"], correct: 1 },
  { question: "x * 4 = 24, toh x = ?", options: ["4", "6", "8"], correct: 1 },
]

export type DifficultyLevel = "beginner" | "intermediate" | "expert";
export const DIFFICULTY_LEVELS: { id: DifficultyLevel; name: string; className: string; description: string; color: string }[] = [
  { id: "beginner", name: "Beginner", className: "Class 6", description: "Basic concepts aur easy questions", color: "#4ade80" },
  { id: "intermediate", name: "Intermediate", className: "Class 7", description: "Thoda challenging, deeper understanding", color: "#fbbf24" },
  { id: "expert", name: "Expert", className: "Class 8", description: "Advanced problems, real mastery!", color: "#ef4444" },
]
