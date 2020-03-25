const tarotTextArray = [{
        header: 'Justice',
        paragraph: 'Du har hamnat i någon rättslig tvist. Du behöver se objektivt på något. Du behöver fatta ett beslut. Ärlighet, omdöme och rättvisa är viktigt för dig just nu. Du medlar mellan människor. Du tar ansvar för ditt liv och rensar i röran. Skönhet, harmoni, klarhet och enkelhet är ledorden här. Du skapar balans i tillvaron. Du undviker (eller behöver undvika) överdrifter av alla slag.'
    },
    {
        header: 'Fool',
        paragraph: 'Det är dags att fatta mod och förverkliga sina kreativa projekt och drömmar. Du bör följa ditt hjärta och göra det du brinner för. Ha modet att vara den du verkligen är utan rädsla och utan att bry dig om vad andra tycker och tänker om det. Ha tilltro till livet och våga uppleva äventyr. Vara öppen och nyfiken som ett barn. Försök att vara totalt närvarande i nuet och våga ta risker. Vänta dig det oväntade. Du är i ett känsligt övergångsskede i livet. Se upp med övermod och impulsivitet men låt inte andra styra dina beslut.'
    },
    {
        header: 'Judgement',
        paragraph: 'Du hör en inre röst som vill genomföra en stor förändring. Du hör ditt samvetes röst. Du känner att du kan förstå, förlåta, försonas och känna frid med det som varit. Du blir mera objektiv och mindre kritisk. Du för fram dina personliga åsikter på ett bra sätt. Du bedömer och gör en personlig bedömning av något. Du vaknar till och får en aha-upplevelse om ditt liv. Familj och arbete knyts ihop på något sätt för dig. Du vill bryta igenom fördomar, diskriminering och dåligt omdöme. Du funderar på att bilda familj.'
    },
    {
        header: 'Temperance',
        paragraph: 'Du kombinerar kunskap med det spontana. Du har behov av att utrycka dig kreativt. Du använder alla dina talanger till att förverkliga en idé. Du förmedlar entusiasm över något på ett lugnt sätt. Du går den gyllene medelvägen. Du utstrålar tillit och glädje i alla situationer. Du har tålamod och genomför något på ditt eget sätt. Du är gränsöverskridande men samtidigt försiktig och måttfull. Du upplever att det är inte bara viktigt vad du gör utan även hur du genomför saker. Du hittar något värdefullt inom dig själv.'
    },
    {
        header: 'Magician',
        paragraph: 'Du behöver och vill använda din tankeförmåga, din mentala förmåga eller din skapande förmåga till något. Din självdisciplin hamnar i fokus. Inspirationen kommer igång. Du är en föregångare och behöver fatta viktiga beslut. Du kan ge livet innehåll och riktning nu. Du ser skillnaden på fantasi och verklighet. Du är redo att möta ditt nya liv. Du har det som krävs för att förverkliga dina drömmar. Du vill tala ut med någon.'
    },
    {
        header: 'Hermit',
        paragraph: 'Du hittar ditt eget inre ljus. Du kompletterar eller avslutar något från det förflutna. Du försonas med din ensamhet och drar dig tillbaka för att bearbeta något. Du dras till meditation, yoga, qigong eller thai chi. Du får kontakt med en vis lärare eller din egen inre vägledare. Du vill ha stillhet och söker dig bort från stress. Du upplever en övergångsperiod i ditt liv. Du värderar din egen visdom och dina egna kunskaper/erfarenheter. Du är en föregångare och lär ut något viktigt. Du avslutar relationer som inte känns meningsfulla för dig. Ytlighet, kallprat och onödig lyx är inget som lockar dig längre. Du söker renhet och enkelhet.'
    },
    {
        header: 'Strength',
        paragraph: 'Lita till din inre styrka. Du har nu styrkan att möta dina inre rädslor och begränsningar. Du kan uthålligt möta alla hinder på vägen. Du har modet att ta risker och står på dig. Du förmår tämja dina känslor utan att förneka dem. Du har livslust. Du släpper något gammalt i ditt undermedvetna som styrt dig och det ger dig ny kraft. Du har självbevarelsedrift. Du drivs av en stark känsla att handla på ett visst sätt. Du känner passion för någon eller något. Du utrycker dig kreativt på många olika sätt. Du upptäcker nya talanger hos dig själv. Du accepterar dig själv som du är. Du omvandlar dina känslor till en drivkraft att förändras.'
    },
    {
        header: 'Star',
        paragraph: 'Du upplever frid, helhet, ödmjukhet och frihet. Du utvecklas genom egna ansträngningar. Du ser med överblick på livet. Du förstår vad det är du önskar dig mest av allt. Du övertygar genom din närvaro. Ditt undermedvetna blir ljust och upplyst. Du går från mörker till ljus. Du ger av dina resurser och din energi till andra. Du är kreativ, produktiv och inspirerad. Du sprider ljus och harmoni omkring dig. Du har självförtroende och självkänsla. Du värderar dig själv och dina kunskaper.'
    },
    {
        header: 'Wheel of Fortune',
        paragraph: 'Oväntade möjligheter till positiva förändringar presenterar sig. Du kan ha tur med pengar på olika sätt. Lyckan står dig bi. Du får skörda frukten av något du tidigare sått. Du har satt hjulen i rullning och kan koppla av. Karma och tidigare liv blir viktiga för dig nu. Du får ett genombrott med något viktigt. Du är i ditt center och klarar av att ta emot framgång.'
    },
    {
        header: 'Tower',
        paragraph: 'Du befrias från det ”fängelse” du byggt runt dig själv. Du upplever händelser som tvingar dig att förändra förutsättningarna i ditt liv. Du får en aha-upplevelse om något. Du får omvärdera din syn på dig själv. Du blir mera sann mot dig själv och andra. Du blir varnad om något. Du renas och helas. Du upplever omorganisation, renovering eller upprustning av något i ditt liv.'
    },
    {
        header: 'Hanged Man',
        paragraph: 'Du sitter fast och kommer ingenstans. Du är passiv och det är ok just nu. Du upplever lugnet efter stormen och kan vänta in nästa steg. Du accepterar din situation och väntar på rätt tillfälle att förändra den. Någon behöver dig och du uppoffrar dig. Du släpper behovet av att alltid ha kontroll. Genom att dra dig tillbaka får du viktiga insikter. Du ser på dig själv och verkligheten på nya sätt. Du gör något på ett annorlunda sätt. Du bryr dig inte om det sociala trycket längre. Du flyr in i dig själv och bort från det sociala livet. Se upp för martyr- och flyktbeteenden som t ex användandet av droger.'
    },
    {
        header: 'Chariot',
        paragraph: 'Du reser, flyttar eller byter arbete. Du upplever förändringar vad gäller familjen eller hemmet. Du tar ansvar och gör nödvändiga förändringar i ditt liv. Du mognar som människa. Du vet när du ska vänta och när du ska handla. Du lämnar något bakom dig men i din egen takt.'
    },
    {
        header: 'Devil',
        paragraph: 'Du utstrålar en stark kreativitet. Du är sunt sexuell och sensuell. Du är jordad och grundad. Du har humor. Du ser ”under ytan” på saker. Du vill ha mera kunskap. Du har utstrålning och humor. Du upplever förvirring, hämndbegär, rädsla, förtryck, ofrihet, manipulation och känner dig utnyttjad. Du låter din passion styra ditt omdöme. Du känner dig begränsad och känner dig styrd av egna eller andras begär. Du möter olika frestelser. Du blir någons syndabock eller upplever dig själv som martyr. Du dras till människor eller vanor som inte är bra för dig.'
    },
    {
        header: 'Hierophant',
        paragraph: 'Du har kreativa idéer som gör livet stabilare och mera produktivt. Du möter gamla rädslor om misslyckande. Du släpper mönster som handlar om oro. Du löser problem rörande familjen. Du funderar på vad som håller dig tillbaka och gör dig ofri. Du börjar studera eller lär själv ut något. Du lär dig nya saker om dig själv och lyssna till din inre röst mera. Du söker dig till människor med en liknande livsåskådning som du. Du söker rådgivning och vägledning. Du hittar en bra lärare och det du vill studera. Du känner att du vill komma vidare i din andliga och personliga utveckling.'
    },
    {
        header: 'Priestess',
        paragraph: 'Det undermedvetna, intuitionen och dina nattliga drömmar spelar en stor roll i ditt liv just nu. Du behöver troligen dra dig undan från ett tag. Du behöver få kontakt med din inre röst. Du är känslig, mottaglig och behöver tystnad och stillhet runt dig just nu. Du behöver nog skriva dagbok och fundera i stället för att berätta för alla om hur du mår. Sök dig gärna till vatten och sitt där i tystnad. Du inser att du går in i en ny tid i ditt liv och att något nytt tar sin början. Vakta ditt oberoende och låt inte andra påverka dig och dina beslut för mycket.'
    },
    {
        header: 'Lovers',
        paragraph: 'Två människor samarbetar för ett gemensamt mål. Du kombinerar tanke och känsla. Du behöver erkänna olika stridande viljor, inom dig och mellan älskande, samt hitta en gemensam ståndpunkt. Du ställs inför ett val. Din fria vilja blir viktig för dig just nu. Du får, eller behöver få, känslomässigt stöd från någon närstående. Du tänker mycket på frågor kring familj, trygghet och beskydd. Du funderar mycket på vad du får och ger i dina relationer. Du ser egenskaper hos andra som du själv vill ha. Du inleder en kärleksrelation och/eller gifter dig.'
    }
]
let isClicked = false;

$(document).ready(function () {

    $('#content-one').on('mousemove', (e) => {
        $('#content-one').css('opacity', 0.5)
    })

    $('#content-one').on('mouseout', (e) => {
        $('#content-one').css('opacity', 0.3)
    })

    $('#clickable-card').on('click', (e) => {
        
        if (!isClicked) {
            showCard(e)
            isClicked = true
        } else {
            hideCard(e)
            isClicked = false
        }
    })
    let madSpirits = false
    let spirits

    $(window).on('resize', (e) => {
        $('.needle').remove()
    })

    $(window).on('scroll', (e) => {

        if (e.currentTarget.scrollY > $('#content-three')[0].offsetTop && e.currentTarget.scrollY < ($('#content-three')[0].offsetTop + window.innerHeight)) {
            $('#shrunken-head').css('top', (e.currentTarget.scrollY - $('#content-three')[0].offsetTop) + (window.innerHeight / 2) + 'px')
                .css('height', 20 + (((e.currentTarget.scrollY - $('#content-three')[0].offsetTop) / window.innerHeight) * 100) + 'vh')
            madSpirits = false
            clearInterval(spirits)
            $('#shrunken-head').attr('src', '/img/shrunkenhead.png')
        } else if (e.currentTarget.scrollY >= ($('#content-three')[0].offsetTop + window.innerHeight) && e.currentTarget.scrollY < $('#content-four')[0].offsetTop) {
            $('#shrunken-head').attr('src', '/img/shrunkenhead2.png')
            $('#shrunken-head').css('top', (e.currentTarget.scrollY - $('#content-three')[0].offsetTop) + (window.innerHeight / 2) + 'px')

            if (!madSpirits) {
                spirits = setInterval(() => {
                    $('#shrunken-head').css('left', 50 - Math.random() * 5 + '%')
                    setTimeout(() => {
                        $('#shrunken-head').css('left', 50 - Math.random() * 5 + '%')
                    }, 100);
                    setTimeout(() => {
                        $('#shrunken-head').css('left', 50 - Math.random() * 5 + '%')
                    }, 150);
                    setTimeout(() => {
                        $('#shrunken-head').css('left', 50 - Math.random() * 5 + '%')
                    }, 200);
                    setTimeout(() => {
                        $('#shrunken-head').css('left', 50 - Math.random() * 5 + '%')
                    }, 250);
                    setTimeout(() => {
                        $('#shrunken-head').css('left', 50 - Math.random() * 5 + '%')
                    }, 300);
                    setTimeout(() => {
                        $('#shrunken-head').css('left', 50 - Math.random() * 5 + '%')
                    }, 350);
                    setTimeout(() => {
                        $('#shrunken-head').css('left', 50 + '%')
                    }, 400);
                }, 1000);
            }
            madSpirits = true
        } else if (e.currentTarget.scrollY >= $('#content-four')[0].offsetTop) {
            madSpirits = false
            clearInterval(spirits)
        }
      
        
    }) 
    
    $('#voodoo-doll').on('click', (e) => {
        console.log(e.offsetY)
        console.log(e)
        const thing = (window.innerHeight/2) - (e.target.height/2)
        const otherthing = (window.innerWidth/4) - (e.target.width/2)
        $('<img>').attr('src', '/img/needle.png')
                    .addClass('needle')
                    .css('left', (e.offsetX+otherthing) + 'px')
                    .css('top', (e.offsetY+thing) + 'px')
                    .appendTo('#voodo-doll-container')
  
            $('<img>').attr('src', '/img/heartattack.png')
                    .appendTo('body')
                    .attr('id', 'splash-voodoo')
                    .css('opacity', 0)
                    .css('top', e.view.scrollY + (window.innerHeight/2) + 'px')
             
            setTimeout(() => {
                $('#splash-voodoo').remove()
            }, 1500);
       
    })
});

function showCard(e) {
    let leftPosition
    if (window.innerWidth < 1200)
        leftPosition = 66
    else
        leftPosition = 50

    $(e.target).css('transform', 'perspective(1000px) rotateY(-90deg)  translate(50%,-50%)')
    setTimeout(() => {
        $(e.target).css('transform', 'perspective(1000px) rotateY(0deg)  translate(-50%,-50%)')
            .css('left', leftPosition + '%')
        let r = (1 + Math.random() * (17 - 1))
        r = Math.floor(r)
        $(e.target).attr('src', '/img/card' + r + '.png')

        $('#tarot-header').html(tarotTextArray[r - 1].header)
            .css('opacity', 1)
        $('#tarot-text').html(tarotTextArray[r - 1].paragraph)
            .css('opacity', 1)
    }, 300);
}

function hideCard(e) {
    let leftPosition
    if (window.innerWidth < 1200)
        leftPosition = 33
    else
        leftPosition = 20

    $(e.target).css('transform', 'perspective(1000px) rotateY(-90deg)  translate(50%,-50%)')
        .css('left', leftPosition + '%')
    setTimeout(() => {
        $(e.target).css('transform', 'perspective(1000px) rotateY(-180deg)  translate(50%,-50%)') -

            $(e.target).attr('src', '/img/cardback.png')

    }, 300);
}