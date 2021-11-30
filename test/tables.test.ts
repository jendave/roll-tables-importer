import { hasWeights, isRedditCollection, parseRedditCollection, parseRedditTable } from '../src/module/table.clipboard';

describe('hasWeights', () => {
  it('should return true if the element has weights', () => {
    const item = '\n06-10. breeze, slight, damp.';
    expect(hasWeights(item)).toBe(true);
  });
});

describe('parseRedditTable', () => {
  it('should parse a single table', () => {
    const table =
      'd10 The castle sits...\n\n    Atop a mountain.\n\n    On a hill overlooking a wide plain.\n\n    At the fork of a river.\n\n    On a narrow, rocky peninsula.\n\n    Above a seaside cliff.\n\n    On a hill overlooking a river valley.\n\n    On a hill rising out of a swamp.\n\n    On a hill overlooking a forest.\n\n    Astride a desert oasis or natural spring.\n\n    On a ridge overlooking a frozen plain.';
    const parsed = parseRedditTable(table);
    expect(parsed.results).toHaveLength(10);
    expect(parsed.name).toBe('d10 The castle sits...');
    expect(parsed.formula).toBe('1d10');
  });
  it('should use table weights if provided', () => {
    const table =
      'd100 Air Currents\n01-05. breeze, slight.\n06-10. breeze, slight, damp.\n11-12. breeze, gusting.\n13-18. cold current.\n19-20. downdraft, slight.\n21-22. downdraft, strong.\n23-69. still.\n70-75. still, very chill.\n76-85. still, warm (or hot).\n86-87. updraft, slight.\n88-89. updraft, strong.\n90-93. wind, strong.\n94-95. wind, strong, gusting.\n96-100. wind, strong, moaning.';
    const parsed = parseRedditTable(table);
    expect(parsed.results).toHaveLength(14);
    expect(parsed.formula).toBe('1d100');
    expect(parsed.results[0].range).toBe([1, 5]);
  });
});

describe('parseRedditCollection', () => {
  it('should parse a collection of tables', () => {
    const table =
      "Random Castle: To the keep!...\n\nd10 The castle sits...\n\n    Atop a mountain.\n\n    On a hill overlooking a wide plain.\n\n    At the fork of a river.\n\n    On a narrow, rocky peninsula.\n\n    Above a seaside cliff.\n\n    On a hill overlooking a river valley.\n\n    On a hill rising out of a swamp.\n\n    On a hill overlooking a forest.\n\n    Astride a desert oasis or natural spring.\n\n    On a ridge overlooking a frozen plain.\n\nd12 The castle was built by...\n\n    A wise king or queen.\n\n    An ambitious lord or lady.\n\n    An evil tyrant.\n\n    A mighty warrior or warlord.\n\n    A retired adventurer.\n\n    A celebrated war hero.\n\n    An unscrupulous king or queen.\n\n    A vain lord or lady.\n\n    A powerful witch or wizard.\n\n    A beloved sovereign.\n\n    A prosperous merchant.\n\n    A member of an ancient noble house.\n\nd4 The castle was built...\n\n    In a past age.\n\n    Hundreds of years ago.\n\n    A few decades ago.\n\n    Within the past decade.\n\nd6 Currently, the castle’s condition is...\n\n    Perfect; upkeep has been fastidious.\n\n    Good; it been well-maintained.\n\n    Decent; there are only a few cracks in the walls, but the place can withstand a siege.\n\n    Fair; the castle has seen better days.\n\n    Poor; the walls and towers are in dire need of repairs.\n\n    Decrepit; the place is practically a ruin.\n\nd12 Presently, the castle is occupied by...\n\n    A member of the royal family.\n\n    An ambitious lord or lady.\n\n    An evil tyrant.\n\n    An elderly lord or lady.\n\n    A brash, young lord or lady.\n\n    A mercenary company.\n\n    A fearsome warlord or retired sellsword.\n\n    A wealthy merchant.\n\n    A retired pirate or thief.\n\n    A former adventurer.\n\n    An absentee noble lord.\n\n    The crown, but the king or queen rarely stays here.\n\nd12 The position or territory is worth defending because...\n\n    Grains grow well on the surrounding land.\n\n    The nearby mines are rich in ores or gems.\n\n    The surrounding land is excellent for grazing livestock.\n\n    Fruit trees grow on the surrounding land.\n\n    The nearby pass is the easiest way to cross the mountains.\n\n    The nearby harbor is important for trade.\n\n    The nearby river is important for trade.\n\n    The nearby source of freshwater is precious is in this region.\n\n    The wild lands beyond are full of threats.\n\n    The surrounding lands are part of a long-standing territorial dispute.\n\n    The surrounding land is held sacred.\n\n    The nearby lands are home to a rare herb, tree, or creature that has magical uses.\n\nd10 The castle’s outer defenses include...\n\n    Very high stone walls.\n\n    Incredibly thick stone walls.\n\n    A series of curtain walls and gatehouses.\n\n    A treacherous climb to reach the castle walls.\n\n    A moat filled with putrescent water.\n\n    A moat filled with thick, boot-sucking mud.\n\n    A moat filled with sharp spikes.\n\n    A moat that is home to one or more dangerous aquatic beasts.\n\n    An immense barbican.\n\n    A narrow footbridge to reach the postern.\n\nd6 The inner keep’s defenses include...\n\n    Hundreds of arrow slits.\n\n    One of the world's largest dual-portcullis gates.\n\n    A winding climb to reach the entrance.\n\n    Several covered parapets with murder holes under which intruders must pass.\n\n    A wide courtyard surrounded by flanking towers in the curtain wall.\n\n    An unusual or hidden means of entry.\n\nd8 The castle can be held effectively by as few as...\n\n    5 soldiers and 20 archers.\n\n    20 soldiers, 5 knights, and 20 archers.\n\n    50 soldiers, 10 knights, and 40 archers.\n\n    20 knights, 20 archers, and 5 warmages.\n\n    100 soldiers, 50 archers, and 5 warmages.\n\n    100 soldiers, 20 knights, and 50 archers.\n\n    200 soldiers, 50 knights, and 100 archers.\n\n    200 soldiers, 100 knights, and 200 archers.\n\nd6 In addition to its garrison, the castle can hold foodstores to withstand a three-month siege for up to...\n\n    50 people.\n\n    100 people.\n\n    200 people.\n\n    500 people.\n\n    1,000 people.\n\n    2,000 people.\n\nd12 The castle is known for...\n\n    Withstanding a grueling, lengthy siege.\n\n    Suffering an immense conflagration.\n\n    Changing hands several times over the course of the same war.\n\n    Bringing ill-fortune to those who hold it.\n\n    Being haunted by a former occupant.\n\n    Never falling in a siege.\n\n    Welcoming travelers seeking refuge.\n\n    Turning away travelers seeking refuge.\n\n    Its unusual architectural style.\n\n    Its beautiful, historic tapestries.\n\n    Its breathtakingly beautiful chapel.\n\n    The quality of its meals.\n\nd12 What is rumored to be hidden in the castle?\n\n    An underground tunnel that can serve as a last-gasp escape route.\n\n    The weapon of a long-dead hero.\n\n    The preserved head of an ancient villain.\n\n    A long-lost religious artifact.\n\n    A missing lord or lady.\n\n    A book of vile curses.\n\n    A book of dark and ancient secrets.\n\n    A cursed treasure hoard.\n\n    The last bottle of famous vintage of wine.\n\n    A lost work of a celebrated artist.\n\n    The crypt of an ancient sovereign.\n\n    An unhatched dragon egg.\n\nd20 Rooms: This chamber is...\n\n    An antechamber or waiting room.\n\n    An armory.\n\n    An aviary, dovecote, owlery, or rookery.\n\n    A banquet hall.\n\n    The barracks.\n\n    A bath or privy.\n\n    A bedroom (d3): 1. simple; 2. comfortable; 3. luxurious.\n\n    A chapel or shrine.\n\n    A crypt.\n\n    An intimate or informal dining room.\n\n    A dressing room.\n\n    A gallery (d6): 1. armor and weaponry; 2. paintings; 3. sculptures; 4. tapestries; 5. hunting trophies; 6. trophies of war.\n\n    A guardroom.\n\n    A kennel, menagerie, or stable.\n\n    The kitchen.\n\n    A library or study.\n\n    A pantry.\n\n    Store room for mundane supplies or a cistern for drinking water.\n\n    The throne room.\n\n    A treasure vault (likely hidden and/or protected by traps).\n\nd20 Features: You notice...\n\n    An armchair flanked by two sconces.\n\n    A large armoire or buffet cabinet.\n\n    A bench with a cusion.\n\n    A brazier.\n\n    A candelabrum on a large table.\n\n    A plain chair beside a window.\n\n    A heavy wooden chest.\n\n    A chest of drawers with a blanket on top.\n\n    A desk with some quills and parchment.\n\n    A fireplace with a mantle.\n\n    A fireplace with a small pile of wood.\n\n    A fresco with a padded chair beneath it.\n\n    Portrait of a noble.\n\n    A painting of a landscape or seascape.\n\n    A bust on a pedestal.\n\n    A shelf containing books or knick knacks.\n\n    A low table in front of a small sofa.\n\n    A large table beneath a chandelier.\n\n    An ornate tapestry.\n\n    A small wall basin and font.\n\nENCOUNTERS\n\nd10 Under siege: You come upon...\n\n    A squad of archers hustling up a stair.\n\n    A patrol of guards brandishing weapons.\n\n    A guard shouting instructions.\n\n    A knight hurrying to the stables.\n\n    A servant cowering in a hiding place.\n\n    A curious child peaking out a window.\n\n    A servant kneeling in prayer.\n\n    A noble hastily penning a letter.\n\n    A squire aiding a knight with his armor.\n\n    A healer checking over his potions.\n\nd10 In peace: You come upon...\n\n    The huntsman cleaning a recent kill.\n\n    The kennelmaster leading a leashed dog.\n\n    The horsemaster instructing a young rider.\n\n    The armorer scolding an apprentice.\n\n    A maid fussing over her lady’s dress.\n\n    The tutor or sage lost in a book.\n\n    The chaplain whispering with a maid.\n\n    A maid polishing an ornamental shield.\n\n    A servant carrying a tray of food.\n\n    Several archers practicing in the yard.";
    const parsed = parseRedditCollection(table);
    expect(parsed.collection).toHaveLength(16);
    expect(parsed.name).toEqual('Random Castle: To the keep!...');
  });
});

describe('isRedditColleciton', () => {
  it('should return true for a valid collection', () => {
    const table =
      "Random Castle: To the keep!...\n\nd10 The castle sits...\n\n    Atop a mountain.\n\n    On a hill overlooking a wide plain.\n\n    At the fork of a river.\n\n    On a narrow, rocky peninsula.\n\n    Above a seaside cliff.\n\n    On a hill overlooking a river valley.\n\n    On a hill rising out of a swamp.\n\n    On a hill overlooking a forest.\n\n    Astride a desert oasis or natural spring.\n\n    On a ridge overlooking a frozen plain.\n\nd12 The castle was built by...\n\n    A wise king or queen.\n\n    An ambitious lord or lady.\n\n    An evil tyrant.\n\n    A mighty warrior or warlord.\n\n    A retired adventurer.\n\n    A celebrated war hero.\n\n    An unscrupulous king or queen.\n\n    A vain lord or lady.\n\n    A powerful witch or wizard.\n\n    A beloved sovereign.\n\n    A prosperous merchant.\n\n    A member of an ancient noble house.\n\nd4 The castle was built...\n\n    In a past age.\n\n    Hundreds of years ago.\n\n    A few decades ago.\n\n    Within the past decade.\n\nd6 Currently, the castle’s condition is...\n\n    Perfect; upkeep has been fastidious.\n\n    Good; it been well-maintained.\n\n    Decent; there are only a few cracks in the walls, but the place can withstand a siege.\n\n    Fair; the castle has seen better days.\n\n    Poor; the walls and towers are in dire need of repairs.\n\n    Decrepit; the place is practically a ruin.\n\nd12 Presently, the castle is occupied by...\n\n    A member of the royal family.\n\n    An ambitious lord or lady.\n\n    An evil tyrant.\n\n    An elderly lord or lady.\n\n    A brash, young lord or lady.\n\n    A mercenary company.\n\n    A fearsome warlord or retired sellsword.\n\n    A wealthy merchant.\n\n    A retired pirate or thief.\n\n    A former adventurer.\n\n    An absentee noble lord.\n\n    The crown, but the king or queen rarely stays here.\n\nd12 The position or territory is worth defending because...\n\n    Grains grow well on the surrounding land.\n\n    The nearby mines are rich in ores or gems.\n\n    The surrounding land is excellent for grazing livestock.\n\n    Fruit trees grow on the surrounding land.\n\n    The nearby pass is the easiest way to cross the mountains.\n\n    The nearby harbor is important for trade.\n\n    The nearby river is important for trade.\n\n    The nearby source of freshwater is precious is in this region.\n\n    The wild lands beyond are full of threats.\n\n    The surrounding lands are part of a long-standing territorial dispute.\n\n    The surrounding land is held sacred.\n\n    The nearby lands are home to a rare herb, tree, or creature that has magical uses.\n\nd10 The castle’s outer defenses include...\n\n    Very high stone walls.\n\n    Incredibly thick stone walls.\n\n    A series of curtain walls and gatehouses.\n\n    A treacherous climb to reach the castle walls.\n\n    A moat filled with putrescent water.\n\n    A moat filled with thick, boot-sucking mud.\n\n    A moat filled with sharp spikes.\n\n    A moat that is home to one or more dangerous aquatic beasts.\n\n    An immense barbican.\n\n    A narrow footbridge to reach the postern.\n\nd6 The inner keep’s defenses include...\n\n    Hundreds of arrow slits.\n\n    One of the world's largest dual-portcullis gates.\n\n    A winding climb to reach the entrance.\n\n    Several covered parapets with murder holes under which intruders must pass.\n\n    A wide courtyard surrounded by flanking towers in the curtain wall.\n\n    An unusual or hidden means of entry.\n\nd8 The castle can be held effectively by as few as...\n\n    5 soldiers and 20 archers.\n\n    20 soldiers, 5 knights, and 20 archers.\n\n    50 soldiers, 10 knights, and 40 archers.\n\n    20 knights, 20 archers, and 5 warmages.\n\n    100 soldiers, 50 archers, and 5 warmages.\n\n    100 soldiers, 20 knights, and 50 archers.\n\n    200 soldiers, 50 knights, and 100 archers.\n\n    200 soldiers, 100 knights, and 200 archers.\n\nd6 In addition to its garrison, the castle can hold foodstores to withstand a three-month siege for up to...\n\n    50 people.\n\n    100 people.\n\n    200 people.\n\n    500 people.\n\n    1,000 people.\n\n    2,000 people.\n\nd12 The castle is known for...\n\n    Withstanding a grueling, lengthy siege.\n\n    Suffering an immense conflagration.\n\n    Changing hands several times over the course of the same war.\n\n    Bringing ill-fortune to those who hold it.\n\n    Being haunted by a former occupant.\n\n    Never falling in a siege.\n\n    Welcoming travelers seeking refuge.\n\n    Turning away travelers seeking refuge.\n\n    Its unusual architectural style.\n\n    Its beautiful, historic tapestries.\n\n    Its breathtakingly beautiful chapel.\n\n    The quality of its meals.\n\nd12 What is rumored to be hidden in the castle?\n\n    An underground tunnel that can serve as a last-gasp escape route.\n\n    The weapon of a long-dead hero.\n\n    The preserved head of an ancient villain.\n\n    A long-lost religious artifact.\n\n    A missing lord or lady.\n\n    A book of vile curses.\n\n    A book of dark and ancient secrets.\n\n    A cursed treasure hoard.\n\n    The last bottle of famous vintage of wine.\n\n    A lost work of a celebrated artist.\n\n    The crypt of an ancient sovereign.\n\n    An unhatched dragon egg.\n\nd20 Rooms: This chamber is...\n\n    An antechamber or waiting room.\n\n    An armory.\n\n    An aviary, dovecote, owlery, or rookery.\n\n    A banquet hall.\n\n    The barracks.\n\n    A bath or privy.\n\n    A bedroom (d3): 1. simple; 2. comfortable; 3. luxurious.\n\n    A chapel or shrine.\n\n    A crypt.\n\n    An intimate or informal dining room.\n\n    A dressing room.\n\n    A gallery (d6): 1. armor and weaponry; 2. paintings; 3. sculptures; 4. tapestries; 5. hunting trophies; 6. trophies of war.\n\n    A guardroom.\n\n    A kennel, menagerie, or stable.\n\n    The kitchen.\n\n    A library or study.\n\n    A pantry.\n\n    Store room for mundane supplies or a cistern for drinking water.\n\n    The throne room.\n\n    A treasure vault (likely hidden and/or protected by traps).\n\nd20 Features: You notice...\n\n    An armchair flanked by two sconces.\n\n    A large armoire or buffet cabinet.\n\n    A bench with a cusion.\n\n    A brazier.\n\n    A candelabrum on a large table.\n\n    A plain chair beside a window.\n\n    A heavy wooden chest.\n\n    A chest of drawers with a blanket on top.\n\n    A desk with some quills and parchment.\n\n    A fireplace with a mantle.\n\n    A fireplace with a small pile of wood.\n\n    A fresco with a padded chair beneath it.\n\n    Portrait of a noble.\n\n    A painting of a landscape or seascape.\n\n    A bust on a pedestal.\n\n    A shelf containing books or knick knacks.\n\n    A low table in front of a small sofa.\n\n    A large table beneath a chandelier.\n\n    An ornate tapestry.\n\n    A small wall basin and font.\n\nENCOUNTERS\n\nd10 Under siege: You come upon...\n\n    A squad of archers hustling up a stair.\n\n    A patrol of guards brandishing weapons.\n\n    A guard shouting instructions.\n\n    A knight hurrying to the stables.\n\n    A servant cowering in a hiding place.\n\n    A curious child peaking out a window.\n\n    A servant kneeling in prayer.\n\n    A noble hastily penning a letter.\n\n    A squire aiding a knight with his armor.\n\n    A healer checking over his potions.\n\nd10 In peace: You come upon...\n\n    The huntsman cleaning a recent kill.\n\n    The kennelmaster leading a leashed dog.\n\n    The horsemaster instructing a young rider.\n\n    The armorer scolding an apprentice.\n\n    A maid fussing over her lady’s dress.\n\n    The tutor or sage lost in a book.\n\n    The chaplain whispering with a maid.\n\n    A maid polishing an ornamental shield.\n\n    A servant carrying a tray of food.\n\n    Several archers practicing in the yard.";
    expect(isRedditCollection(table)).toBe(true);
  });

  it('should return false for a single table', () => {
    const table =
      "Random Castle: To the keep!...\n\nd10 The castle sits...\n\n    Atop a mountain.\n\n    On a hill overlooking a wide plain.\n\n    At the fork of a river.\n\n    On a narrow, rocky peninsula.\n\n    Above a seaside cliff.\n\n    On a hill overlooking a river valley.\n\n    On a hill rising out of a swamp.\n\n    On a hill overlooking a forest.\n\n    Astride a desert oasis or natural spring.\n\n    On a ridge overlooking a frozen plain.\n\nd12 The castle was built by...\n\n    A wise king or queen.\n\n    An ambitious lord or lady.\n\n    An evil tyrant.\n\n    A mighty warrior or warlord.\n\n    A retired adventurer.\n\n    A celebrated war hero.\n\n    An unscrupulous king or queen.\n\n    A vain lord or lady.\n\n    A powerful witch or wizard.\n\n    A beloved sovereign.\n\n    A prosperous merchant.\n\n    A member of an ancient noble house.\n\nd4 The castle was built...\n\n    In a past age.\n\n    Hundreds of years ago.\n\n    A few decades ago.\n\n    Within the past decade.\n\nd6 Currently, the castle’s condition is...\n\n    Perfect; upkeep has been fastidious.\n\n    Good; it been well-maintained.\n\n    Decent; there are only a few cracks in the walls, but the place can withstand a siege.\n\n    Fair; the castle has seen better days.\n\n    Poor; the walls and towers are in dire need of repairs.\n\n    Decrepit; the place is practically a ruin.\n\nd12 Presently, the castle is occupied by...\n\n    A member of the royal family.\n\n    An ambitious lord or lady.\n\n    An evil tyrant.\n\n    An elderly lord or lady.\n\n    A brash, young lord or lady.\n\n    A mercenary company.\n\n    A fearsome warlord or retired sellsword.\n\n    A wealthy merchant.\n\n    A retired pirate or thief.\n\n    A former adventurer.\n\n    An absentee noble lord.\n\n    The crown, but the king or queen rarely stays here.\n\nd12 The position or territory is worth defending because...\n\n    Grains grow well on the surrounding land.\n\n    The nearby mines are rich in ores or gems.\n\n    The surrounding land is excellent for grazing livestock.\n\n    Fruit trees grow on the surrounding land.\n\n    The nearby pass is the easiest way to cross the mountains.\n\n    The nearby harbor is important for trade.\n\n    The nearby river is important for trade.\n\n    The nearby source of freshwater is precious is in this region.\n\n    The wild lands beyond are full of threats.\n\n    The surrounding lands are part of a long-standing territorial dispute.\n\n    The surrounding land is held sacred.\n\n    The nearby lands are home to a rare herb, tree, or creature that has magical uses.\n\nd10 The castle’s outer defenses include...\n\n    Very high stone walls.\n\n    Incredibly thick stone walls.\n\n    A series of curtain walls and gatehouses.\n\n    A treacherous climb to reach the castle walls.\n\n    A moat filled with putrescent water.\n\n    A moat filled with thick, boot-sucking mud.\n\n    A moat filled with sharp spikes.\n\n    A moat that is home to one or more dangerous aquatic beasts.\n\n    An immense barbican.\n\n    A narrow footbridge to reach the postern.\n\nd6 The inner keep’s defenses include...\n\n    Hundreds of arrow slits.\n\n    One of the world's largest dual-portcullis gates.\n\n    A winding climb to reach the entrance.\n\n    Several covered parapets with murder holes under which intruders must pass.\n\n    A wide courtyard surrounded by flanking towers in the curtain wall.\n\n    An unusual or hidden means of entry.\n\nd8 The castle can be held effectively by as few as...\n\n    5 soldiers and 20 archers.\n\n    20 soldiers, 5 knights, and 20 archers.\n\n    50 soldiers, 10 knights, and 40 archers.\n\n    20 knights, 20 archers, and 5 warmages.\n\n    100 soldiers, 50 archers, and 5 warmages.\n\n    100 soldiers, 20 knights, and 50 archers.\n\n    200 soldiers, 50 knights, and 100 archers.\n\n    200 soldiers, 100 knights, and 200 archers.\n\nd6 In addition to its garrison, the castle can hold foodstores to withstand a three-month siege for up to...\n\n    50 people.\n\n    100 people.\n\n    200 people.\n\n    500 people.\n\n    1,000 people.\n\n    2,000 people.\n\nd12 The castle is known for...\n\n    Withstanding a grueling, lengthy siege.\n\n    Suffering an immense conflagration.\n\n    Changing hands several times over the course of the same war.\n\n    Bringing ill-fortune to those who hold it.\n\n    Being haunted by a former occupant.\n\n    Never falling in a siege.\n\n    Welcoming travelers seeking refuge.\n\n    Turning away travelers seeking refuge.\n\n    Its unusual architectural style.\n\n    Its beautiful, historic tapestries.\n\n    Its breathtakingly beautiful chapel.\n\n    The quality of its meals.\n\nd12 What is rumored to be hidden in the castle?\n\n    An underground tunnel that can serve as a last-gasp escape route.\n\n    The weapon of a long-dead hero.\n\n    The preserved head of an ancient villain.\n\n    A long-lost religious artifact.\n\n    A missing lord or lady.\n\n    A book of vile curses.\n\n    A book of dark and ancient secrets.\n\n    A cursed treasure hoard.\n\n    The last bottle of famous vintage of wine.\n\n    A lost work of a celebrated artist.\n\n    The crypt of an ancient sovereign.\n\n    An unhatched dragon egg.\n\nd20 Rooms: This chamber is...\n\n    An antechamber or waiting room.\n\n    An armory.\n\n    An aviary, dovecote, owlery, or rookery.\n\n    A banquet hall.\n\n    The barracks.\n\n    A bath or privy.\n\n    A bedroom (d3): 1. simple; 2. comfortable; 3. luxurious.\n\n    A chapel or shrine.\n\n    A crypt.\n\n    An intimate or informal dining room.\n\n    A dressing room.\n\n    A gallery (d6): 1. armor and weaponry; 2. paintings; 3. sculptures; 4. tapestries; 5. hunting trophies; 6. trophies of war.\n\n    A guardroom.\n\n    A kennel, menagerie, or stable.\n\n    The kitchen.\n\n    A library or study.\n\n    A pantry.\n\n    Store room for mundane supplies or a cistern for drinking water.\n\n    The throne room.\n\n    A treasure vault (likely hidden and/or protected by traps).\n\nd20 Features: You notice...\n\n    An armchair flanked by two sconces.\n\n    A large armoire or buffet cabinet.\n\n    A bench with a cusion.\n\n    A brazier.\n\n    A candelabrum on a large table.\n\n    A plain chair beside a window.\n\n    A heavy wooden chest.\n\n    A chest of drawers with a blanket on top.\n\n    A desk with some quills and parchment.\n\n    A fireplace with a mantle.\n\n    A fireplace with a small pile of wood.\n\n    A fresco with a padded chair beneath it.\n\n    Portrait of a noble.\n\n    A painting of a landscape or seascape.\n\n    A bust on a pedestal.\n\n    A shelf containing books or knick knacks.\n\n    A low table in front of a small sofa.\n\n    A large table beneath a chandelier.\n\n    An ornate tapestry.\n\n    A small wall basin and font.\n\nENCOUNTERS\n\nd10 Under siege: You come upon...\n\n    A squad of archers hustling up a stair.\n\n    A patrol of guards brandishing weapons.\n\n    A guard shouting instructions.\n\n    A knight hurrying to the stables.\n\n    A servant cowering in a hiding place.\n\n    A curious child peaking out a window.\n\n    A servant kneeling in prayer.\n\n    A noble hastily penning a letter.\n\n    A squire aiding a knight with his armor.\n\n    A healer checking over his potions.\n\nd10 In peace: You come upon...\n\n    The huntsman cleaning a recent kill.\n\n    The kennelmaster leading a leashed dog.\n\n    The horsemaster instructing a young rider.\n\n    The armorer scolding an apprentice.\n\n    A maid fussing over her lady’s dress.\n\n    The tutor or sage lost in a book.\n\n    The chaplain whispering with a maid.\n\n    A maid polishing an ornamental shield.\n\n    A servant carrying a tray of food.\n\n    Several archers practicing in the yard.";
    expect(isRedditCollection(table)).toBe(true);
  });
});
