import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MapPin, Mail, Hash, ArrowRight, ArrowLeft, Check, Send,
  User, Building2, Clock, Layers, Weight, Calendar, MessageSquareText,
  ChevronRight, PhoneCall,
} from 'lucide-react';
// Atmospheric backdrop — onyx-and-gold install photo used at low opacity
// behind the page header to anchor the page in real Blackstone work.
import contactBackdrop from '@/assets/installations/gold-cabin-mandala.jpg';

/* ──────────────────────────────────────────────────────────────────── */
/*  TYPES                                                                */
/* ──────────────────────────────────────────────────────────────────── */

type FormState = {
  title: 'Mr' | 'Ms' | 'Mrs' | 'Dr';
  name: string;
  organization: string;
  phone: string;
  email: string;
  contactTime: 'Anytime' | 'Morning' | 'Afternoon' | 'Evening';
  projectType: '' | 'Residential' | 'Commercial' | 'Hospital' | 'Industrial' | 'Modernization';
  city: string;
  floors: string;
  capacity: '' | '4-person' | '6-person' | '8-person' | '13-person' | 'Freight';
  timeline: '' | '< 1 month' | '1–3 months' | '3–6 months' | 'Just exploring';
  notes: string;
};

const INITIAL: FormState = {
  title: 'Mr',
  name: '',
  organization: '',
  phone: '',
  email: '',
  contactTime: 'Anytime',
  projectType: '',
  city: 'Chennai',
  floors: '',
  capacity: '',
  timeline: '',
  notes: '',
};

const STEPS = [
  { n: 1, label: 'Who you are',     short: 'You',     icon: User },
  { n: 2, label: 'Reach you at',    short: 'Reach',   icon: Phone },
  { n: 3, label: 'The project',     short: 'Project', icon: Building2 },
  { n: 4, label: 'Specifications',  short: 'Spec',    icon: Layers },
  { n: 5, label: 'Review & send',   short: 'Send',    icon: Send },
] as const;

type Step = typeof STEPS[number]['n'];

/* ──────────────────────────────────────────────────────────────────── */
/*  PAGE                                                                 */
/* ──────────────────────────────────────────────────────────────────── */

export default function Contact() {
  const [step, setStep] = useState<Step>(1);
  const [data, setData] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setData(d => ({ ...d, [k]: v }));

  const validate = (s: Step): boolean => {
    const e: Record<string, string> = {};
    if (s >= 1 && !data.name.trim()) e.name = 'Tell us your name';
    if (s >= 2) {
      if (!data.phone.trim()) e.phone = 'A phone number to call you back';
      else if (!/^[+\d\s\-()]{8,}$/.test(data.phone.trim())) e.phone = 'Doesn\'t look like a phone number';
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = 'Email isn\'t valid';
    }
    if (s >= 3 && !data.projectType) e.projectType = 'Pick a project type';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate(step)) setStep(s => Math.min(5, s + 1) as Step); };
  const prev = () => setStep(s => Math.max(1, s - 1) as Step);

  const jump = (target: Step) => {
    if (target <= step) { setStep(target); return; }
    for (let s = step as Step; s < target; s = (s + 1) as Step) {
      if (!validate(s)) return;
    }
    setStep(target);
  };

  const submit = async () => {
    if (!validate(5)) return;
    setSending(true);
    // No backend wired yet — payload is logged for now; real endpoint TBD.
    // eslint-disable-next-line no-console
    console.log('[Blackstone enquiry]', data);
    await new Promise(r => setTimeout(r, 2400));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative pt-32 md:pt-40 pb-24 px-4 md:px-12 lg:px-20 max-w-7xl mx-auto"
    >
      {/* Page header — paired with a small framed install thumbnail */}
      <header className="mb-10 md:mb-16 grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end">
        <div className="max-w-3xl">
          <p className="eyebrow mb-6">Call the Lift</p>
          <h1 className="font-display italic text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-gold-sheen animate-shimmer">
            Enquire
          </h1>
          <p className="mt-10 md:mt-14 font-sans text-base md:text-lg text-bs-bone/75 leading-relaxed max-w-2xl">
            Five short stops between you and a real quote — or, if you'd rather, just
            drop us your number and we'll call you. Either way, our team replies within
            one working day.
          </p>
        </div>
        {/* Atmospheric thumbnail — desktop only */}
        <div className="hidden md:block relative w-[280px] lg:w-[340px] aspect-[4/5] overflow-hidden rounded-sm border border-bs-shaft">
          <img
            src={contactBackdrop}
            alt="Blackstone cabin interior"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bs-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 font-mono text-[9px] uppercase tracking-widest text-bs-gold/90 bg-bs-black/60 backdrop-blur-sm px-2 py-1 rounded-sm">
            Recent cabin · Chennai
          </div>
        </div>
      </header>

      {/* "Just call me" quick callback — the low-friction path */}
      <QuickCallback />

      {/* The two-panel control room */}
      <div className="grid md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr] gap-6 lg:gap-8">
        <CallPanel
          step={step}
          maxReached={step}
          onJump={jump}
          submitted={submitted}
          sending={sending}
        />

        <div className="relative">
          {!submitted ? (
            <FormDisplay
              step={step}
              data={data}
              errors={errors}
              update={update}
              onNext={next}
              onPrev={prev}
              onSubmit={submit}
              sending={sending}
            />
          ) : (
            <Confirmation data={data} onReset={() => { setData(INITIAL); setStep(1); setSubmitted(false); }} />
          )}
        </div>
      </div>

      {/* Side rail info — visible on every step, below on mobile */}
      <SideInfo />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  QUICK CALLBACK — the "just call me" low-friction path                */
/* ──────────────────────────────────────────────────────────────────── */

function QuickCallback() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedName) { setErr('Tell us your name'); return; }
    if (!/^[+\d\s\-()]{8,}$/.test(trimmedPhone)) { setErr('Phone number please'); return; }
    setErr('');
    setState('sending');
    // No backend yet — log so we can see the payload during development.
    // eslint-disable-next-line no-console
    console.log('[Blackstone quick callback]', { name: trimmedName, phone: trimmedPhone });
    await new Promise(r => setTimeout(r, 900));
    setState('sent');
  };

  if (state === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mb-12 md:mb-16 p-6 md:p-8 rounded-md border border-bs-gold/40 bg-gradient-to-r from-bs-gold/[0.08] via-bs-gold/[0.04] to-transparent overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-bs-gold text-bs-black shrink-0">
            <Check size={18} strokeWidth={2} />
          </span>
          <div>
            <p className="font-display italic text-xl md:text-2xl text-bs-bone leading-tight mb-1">
              Got it, {name.trim().split(' ')[0]}.
            </p>
            <p className="font-sans text-sm text-bs-bone/70">
              We'll call you on <span className="text-bs-gold font-mono">{phone}</span> within one
              working day. If you'd like to leave more detail, fill the panel below.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  const sending = state === 'sending';

  return (
    <form
      onSubmit={send}
      className="relative mb-12 md:mb-16 rounded-md border border-bs-gold/30 bg-gradient-to-br from-bs-gold/[0.06] via-bs-ink to-bs-ink overflow-hidden"
    >
      {/* Decorative left accent — the "emergency call" stripe */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-bs-gold via-bs-champagne to-bs-gold" />

      <div className="p-5 md:p-7 lg:p-8 grid md:grid-cols-[auto_1fr_1fr_auto] gap-4 md:gap-5 items-end">
        {/* Pitch */}
        <div className="md:max-w-[220px]">
          <div className="flex items-center gap-2 mb-2">
            <PhoneCall size={14} strokeWidth={1.5} className="text-bs-gold" />
            <span className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold">
              Or just call me
            </span>
          </div>
          <p className="font-display italic text-xl md:text-2xl text-bs-bone leading-tight">
            We'll ring you back.
          </p>
          <p className="hidden md:block font-sans text-[12px] text-bs-bone/55 mt-1">
            No form. Name + phone, that's it.
          </p>
        </div>

        {/* Name */}
        <label className="block">
          <span className="block font-mono text-[9px] uppercase tracking-widest text-bs-bone/50 mb-1.5">Your name</span>
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            disabled={sending}
            placeholder="Infant Savio"
            className="w-full bg-bs-black/60 border border-bs-shaft rounded-sm px-3 py-3 text-bs-bone placeholder:text-bs-bone/25 focus:outline-none focus:border-bs-gold transition-colors"
          />
        </label>

        {/* Phone */}
        <label className="block">
          <span className="block font-mono text-[9px] uppercase tracking-widest text-bs-bone/50 mb-1.5">Phone</span>
          <input
            value={phone}
            onChange={e => setPhone(e.target.value)}
            disabled={sending}
            type="tel"
            inputMode="tel"
            placeholder="+91 …"
            className="w-full bg-bs-black/60 border border-bs-shaft rounded-sm px-3 py-3 text-bs-bone placeholder:text-bs-bone/25 focus:outline-none focus:border-bs-gold transition-colors"
          />
        </label>

        {/* CTA */}
        <button
          type="submit"
          disabled={sending}
          className="group relative overflow-hidden h-[46px] px-6 rounded-sm bg-bs-gold text-bs-black font-mono text-[10px] uppercase tracking-widest-plus font-bold hover:bg-bs-champagne transition-colors disabled:opacity-60 flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {sending ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                className="inline-block w-3 h-3 border-2 border-bs-black/40 border-t-bs-black rounded-full"
              />
              Sending
            </>
          ) : (
            <>
              <Phone size={12} strokeWidth={2} />
              Call me back
            </>
          )}
        </button>
      </div>

      {err && (
        <p className="px-5 md:px-7 lg:px-8 pb-4 font-mono text-[10px] uppercase tracking-widest text-bs-ember">
          {err}
        </p>
      )}

      {/* Divider with caption */}
      <div className="border-t border-bs-shaft/60 px-5 md:px-7 lg:px-8 py-2.5 flex items-center gap-3">
        <span className="h-px flex-1 bg-bs-shaft/60" />
        <span className="font-mono text-[9px] uppercase tracking-widest text-bs-bone/40">
          Or fill the full panel below for a detailed quote
        </span>
        <span className="h-px flex-1 bg-bs-shaft/60" />
      </div>
    </form>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  CALL PANEL (left column) — brass column with floor buttons           */
/* ──────────────────────────────────────────────────────────────────── */

function CallPanel({
  step, maxReached, onJump, submitted, sending,
}: {
  step: Step;
  maxReached: Step;
  onJump: (s: Step) => void;
  submitted: boolean;
  sending: boolean;
}) {
  const current = STEPS.find(s => s.n === step)!;

  return (
    <aside className="md:sticky md:top-32 self-start">
      <div className="relative rounded-md overflow-hidden border border-bs-gold/30 shadow-[inset_0_0_30px_rgba(212,175,106,0.08),0_20px_60px_-20px_rgba(0,0,0,0.8)]">
        {/* Brushed brass background */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, #1A1611 0%, #2B2218 30%, #1A1611 55%, #2B2218 80%, #1A1611 100%),
              repeating-linear-gradient(to bottom, rgba(212,175,106,0) 0px, rgba(212,175,106,0) 2px, rgba(212,175,106,0.04) 2px, rgba(212,175,106,0.04) 3px)
            `,
            backgroundBlendMode: 'normal, screen',
          }}
        />

        <div className="relative p-5 md:p-6 lg:p-7">
          {/* Header plaque */}
          <div className="text-center mb-5">
            <div className="font-mono text-[8px] uppercase tracking-widest-plus text-bs-gold/80 mb-1">
              Black Stone Elevators
            </div>
            <div className="font-display italic text-bs-gold/90 text-lg leading-none">
              Call Panel
            </div>
          </div>

          {/* LCD display — current floor */}
          <div className="relative mb-6 rounded-sm border border-bs-gold/40 bg-[#0a0908] p-4 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(212,175,106,0.05),transparent_30%)]" />
            <div className="font-mono text-[8px] uppercase tracking-widest text-bs-gold/60 mb-2">
              Current Floor
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${step}-${submitted}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="font-display italic text-2xl md:text-3xl text-bs-gold leading-tight"
              >
                {submitted ? 'Arrived' : sending ? 'En route…' : current.label}
              </motion.div>
            </AnimatePresence>
            <div className="mt-2 font-mono text-[9px] uppercase tracking-widest text-bs-gold/50">
              {submitted ? 'Doors open' : `Step ${step} of 5`}
            </div>
          </div>

          {/* Floor buttons — vertical on desktop, horizontal on small md */}
          <div className="grid grid-cols-5 md:grid-cols-1 gap-2 md:gap-3">
            {STEPS.map(s => {
              const reached = s.n <= maxReached;
              const isCurrent = s.n === step && !submitted;
              const isDone = (s.n < step) || submitted;
              return (
                <button
                  key={s.n}
                  onClick={() => reached && onJump(s.n)}
                  disabled={!reached || submitted}
                  className={`
                    group relative flex md:items-center md:gap-4 justify-center md:justify-start
                    py-3 md:py-2.5 md:px-3 rounded-sm border transition-all
                    ${isCurrent
                      ? 'border-bs-gold bg-gradient-to-br from-bs-gold/25 to-bs-gold/10 shadow-[0_0_18px_rgba(212,175,106,0.45)]'
                      : isDone
                        ? 'border-bs-gold/50 bg-bs-gold/[0.06]'
                        : reached
                          ? 'border-bs-gold/25 bg-bs-black/40 hover:border-bs-gold/50'
                          : 'border-bs-shaft/60 bg-bs-black/30 opacity-50 cursor-not-allowed'}
                  `}
                  aria-current={isCurrent ? 'step' : undefined}
                  aria-label={`Floor ${s.n}: ${s.label}`}
                >
                  {/* Circular floor number */}
                  <span className={`
                    relative inline-flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full
                    font-mono font-bold text-base transition-all
                    ${isCurrent
                      ? 'bg-bs-gold text-bs-black shadow-[0_0_14px_rgba(212,175,106,0.7)]'
                      : isDone
                        ? 'bg-bs-gold/80 text-bs-black'
                        : 'bg-bs-black border border-bs-gold/40 text-bs-gold/70'}
                  `}>
                    {isDone && !isCurrent ? <Check size={14} strokeWidth={2.5} /> : s.n}
                  </span>
                  {/* Label — hidden on mobile (icons-only on the small grid) */}
                  <span className="hidden md:flex flex-col text-left">
                    <span className={`font-mono text-[9px] uppercase tracking-widest-plus
                      ${isCurrent ? 'text-bs-gold' : 'text-bs-bone/60'}`}>
                      Floor {s.n}
                    </span>
                    <span className={`font-sans text-[13px] leading-tight
                      ${isCurrent ? 'text-bs-bone' : 'text-bs-bone/80'}`}>
                      {s.label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Service hours / response time strip */}
          <div className="mt-6 pt-5 border-t border-bs-gold/15">
            <div className="flex items-start gap-2 font-mono text-[9px] uppercase tracking-widest text-bs-bone/60 leading-relaxed">
              <Clock size={11} strokeWidth={1.5} className="mt-0.5 text-bs-gold/70" />
              <span>Replies within<br />one working day</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  FORM DISPLAY (right column) — LCD screen with current step           */
/* ──────────────────────────────────────────────────────────────────── */

function FormDisplay({
  step, data, errors, update, onNext, onPrev, onSubmit, sending,
}: {
  step: Step;
  data: FormState;
  errors: Record<string, string>;
  update: <K extends keyof FormState>(k: K, v: FormState[K]) => void;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  sending: boolean;
}) {
  const firstFieldRef = useRef<HTMLInputElement | HTMLSelectElement | null>(null);
  useEffect(() => { firstFieldRef.current?.focus(); }, [step]);

  return (
    <div className="relative rounded-md overflow-hidden border border-bs-gold/25 bg-bs-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)]">
      {/* Top brushed bar */}
      <div className="h-9 bg-gradient-to-r from-[#1A1611] via-[#2B2218] to-[#1A1611] border-b border-bs-gold/20 flex items-center justify-between px-5">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-bs-gold/70 shadow-[0_0_8px_rgba(212,175,106,0.6)]" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-bs-gold/70">
            Floor {step} / 5 · {STEPS[step - 1].label}
          </span>
        </div>
        <div className="hidden md:flex items-center gap-1">
          {STEPS.map(s => (
            <span key={s.n} className={`w-6 h-px ${s.n <= step ? 'bg-bs-gold' : 'bg-bs-shaft'}`} />
          ))}
        </div>
      </div>

      {/* The "screen" */}
      <div className="relative p-6 md:p-10 lg:p-12 min-h-[520px]">
        <AnimatePresence mode="wait" custom={step}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && <Step1 data={data} errors={errors} update={update} firstRef={firstFieldRef as any} />}
            {step === 2 && <Step2 data={data} errors={errors} update={update} firstRef={firstFieldRef as any} />}
            {step === 3 && <Step3 data={data} errors={errors} update={update} firstRef={firstFieldRef as any} />}
            {step === 4 && <Step4 data={data} errors={errors} update={update} firstRef={firstFieldRef as any} />}
            {step === 5 && <Step5 data={data} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom action bar */}
      <div className="border-t border-bs-gold/15 bg-bs-black/60 p-5 md:p-6 flex items-center justify-between gap-4">
        <button
          onClick={onPrev}
          disabled={step === 1 || sending}
          className="inline-flex items-center gap-2 px-4 py-3 font-mono text-[10px] uppercase tracking-widest-plus text-bs-bone/70 hover:text-bs-bone disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ArrowLeft size={12} strokeWidth={1.5} /> Back
        </button>

        {step < 5 ? (
          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-bs-gold text-bs-black font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-champagne transition-colors"
          >
            Next Floor <ArrowRight size={12} strokeWidth={1.5} />
          </button>
        ) : (
          <CallTheLiftButton sending={sending} onClick={onSubmit} />
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  STEPS                                                                */
/* ──────────────────────────────────────────────────────────────────── */

function Step1({ data, errors, update, firstRef }: any) {
  return (
    <>
      <StepHeader index={1} label="Tell us who you are" hint="So we can address you correctly when we reply." />
      <div className="grid grid-cols-[110px_1fr] gap-4 md:gap-6">
        <Field label="Title">
          <Select
            value={data.title}
            onChange={v => update('title', v)}
            options={['Mr', 'Ms', 'Mrs', 'Dr']}
          />
        </Field>
        <Field label="Full name" error={errors.name} required>
          <Input
            ref={firstRef}
            placeholder="Your name"
            value={data.name}
            onChange={v => update('name', v)}
          />
        </Field>
      </div>
      <Field label="Organisation (optional)" hint="If you're enquiring for a company, builder, or hospital.">
        <Input
          placeholder="Company / Firm / Society"
          value={data.organization}
          onChange={v => update('organization', v)}
        />
      </Field>
    </>
  );
}

function Step2({ data, errors, update, firstRef }: any) {
  return (
    <>
      <StepHeader index={2} label="Where can we reach you?" hint="Phone is the fastest. Email if you prefer written quotes." />
      <Field label="Phone" error={errors.phone} required>
        <Input
          ref={firstRef}
          type="tel"
          placeholder="+91 9X XXX XXXXX"
          value={data.phone}
          onChange={v => update('phone', v)}
          icon={Phone}
        />
      </Field>
      <Field label="Email" error={errors.email} hint="Optional but recommended — we send written quotes here.">
        <Input
          type="email"
          placeholder="you@example.com"
          value={data.email}
          onChange={v => update('email', v)}
          icon={Mail}
        />
      </Field>
      <Field label="Best time to call">
        <Pillset
          value={data.contactTime}
          onChange={v => update('contactTime', v as any)}
          options={['Anytime', 'Morning', 'Afternoon', 'Evening']}
        />
      </Field>
    </>
  );
}

function Step3({ data, errors, update, firstRef }: any) {
  const TYPES: FormState['projectType'][] = ['Residential', 'Commercial', 'Hospital', 'Industrial', 'Modernization'];
  return (
    <>
      <StepHeader index={3} label="The project" hint="A quick sketch of what you're building." />
      <Field label="Project type" error={errors.projectType} required>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {TYPES.map(t => (
            <TileButton
              key={t}
              active={data.projectType === t}
              onClick={() => update('projectType', t)}
            >
              {t}
            </TileButton>
          ))}
        </div>
      </Field>
      <Field label="City">
        <Input
          ref={firstRef}
          placeholder="Chennai"
          value={data.city}
          onChange={v => update('city', v)}
          icon={MapPin}
        />
      </Field>
    </>
  );
}

function Step4({ data, update, firstRef }: any) {
  const CAPS: FormState['capacity'][] = ['4-person', '6-person', '8-person', '13-person', 'Freight'];
  const TIMES: FormState['timeline'][] = ['< 1 month', '1–3 months', '3–6 months', 'Just exploring'];
  return (
    <>
      <StepHeader index={4} label="Specifications" hint="A rough idea is enough — we will refine on the site visit." />
      <div className="grid md:grid-cols-2 gap-x-6">
        <Field label="Number of floors served" hint="Including ground floor.">
          <Input
            ref={firstRef}
            type="number"
            placeholder="e.g. 4"
            value={data.floors}
            onChange={v => update('floors', v)}
            icon={Layers}
          />
        </Field>
        <Field label="Capacity">
          <Pillset
            value={data.capacity}
            onChange={v => update('capacity', v as any)}
            options={CAPS}
            allowEmpty="Not sure"
          />
        </Field>
      </div>
      <Field label="Timeline">
        <Pillset
          value={data.timeline}
          onChange={v => update('timeline', v as any)}
          options={TIMES}
        />
      </Field>
      <Field label="Anything else?" hint="Site quirks, architectural finishes, AMC on existing lift — anything that helps.">
        <Textarea
          placeholder="Tell us a little more…"
          value={data.notes}
          onChange={v => update('notes', v)}
        />
      </Field>
    </>
  );
}

function Step5({ data }: { data: FormState }) {
  const rows: [string, string][] = [
    ['Name',         `${data.title}. ${data.name}` + (data.organization ? ` · ${data.organization}` : '')],
    ['Phone',        data.phone || '—'],
    ['Email',        data.email || '—'],
    ['Best time',    data.contactTime],
    ['Project',      data.projectType || '—'],
    ['City',         data.city || '—'],
    ['Floors',       data.floors || '—'],
    ['Capacity',     data.capacity || 'Not sure'],
    ['Timeline',     data.timeline || '—'],
  ];
  return (
    <>
      <StepHeader index={5} label="Review &amp; send" hint="One last look. Press CALL when you're ready." />
      <div className="rounded-sm border border-bs-gold/25 divide-y divide-bs-gold/10 bg-bs-black/40">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[110px_1fr] gap-4 px-4 md:px-6 py-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-bs-bone/55 pt-0.5">
              {k}
            </div>
            <div className="font-sans text-sm md:text-[15px] text-bs-bone break-words">
              {v}
            </div>
          </div>
        ))}
        {data.notes && (
          <div className="px-4 md:px-6 py-3">
            <div className="font-mono text-[10px] uppercase tracking-widest text-bs-bone/55 mb-1.5">
              Notes
            </div>
            <div className="font-sans text-sm text-bs-bone/85 whitespace-pre-line leading-relaxed">
              {data.notes}
            </div>
          </div>
        )}
      </div>
      <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-bs-mist">
        Pressing CALL signals our team. You will hear back within one working day.
      </p>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  CONFIRMATION                                                         */
/* ──────────────────────────────────────────────────────────────────── */

function Confirmation({ data, onReset }: { data: FormState; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-md overflow-hidden border border-bs-gold/30 bg-bs-ink min-h-[520px] flex flex-col"
    >
      <div className="h-9 bg-gradient-to-r from-[#1A1611] via-[#2B2218] to-[#1A1611] border-b border-bs-gold/20 flex items-center justify-center">
        <span className="font-mono text-[9px] uppercase tracking-widest text-bs-gold/80">
          The Lift Has Arrived
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center p-10 md:p-16 text-center">
        <div className="max-w-md">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
            className="mx-auto w-20 h-20 rounded-full bg-bs-gold/15 border-2 border-bs-gold flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(212,175,106,0.4)]"
          >
            <Check size={32} strokeWidth={2} className="text-bs-gold" />
          </motion.div>
          <h2 className="font-display italic text-4xl md:text-5xl text-bs-bone mb-4 leading-tight">
            Thank you, {data.title} {data.name.split(' ')[0]}.
          </h2>
          <p className="font-sans text-base text-bs-bone/70 leading-relaxed mb-2">
            Your enquiry is on its way to our design team in Manapakkam.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold mb-10">
            Expected reply · within one working day
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+917942704796"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-bs-gold/60 text-bs-gold font-mono text-[10px] uppercase tracking-widest-plus hover:bg-bs-gold/10 transition-colors"
            >
              <Phone size={12} strokeWidth={1.5} /> Or call directly
            </a>
            <button
              onClick={onReset}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-bs-bone/60 hover:text-bs-bone font-mono text-[10px] uppercase tracking-widest-plus transition-colors"
            >
              Send another
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  SIDE INFO                                                            */
/* ──────────────────────────────────────────────────────────────────── */

function SideInfo() {
  return (
    <section className="mt-20 md:mt-28 grid md:grid-cols-4 gap-px bg-bs-shaft/60 border border-bs-shaft/60 rounded-sm overflow-hidden">
      <InfoTile icon={MapPin} title="Address">
        Plot No. 6, T V Nagar,<br />
        Mugalivakkam, Manapakkam,<br />
        Chennai – 600125, Tamil Nadu
      </InfoTile>
      <InfoTile icon={Phone} title="Phone">
        <a href="tel:+917942704796" className="hover:text-bs-gold transition-colors">
          +91 79427 04796
        </a>
        <br />
        <span className="text-bs-bone/50">Mon – Sat · 9:30 to 18:30</span>
      </InfoTile>
      <InfoTile icon={Mail} title="Email">
        <a href="mailto:blackstoneelevators@gmail.com" className="hover:text-bs-gold transition-colors break-words">
          blackstoneelevators<br />@gmail.com
        </a>
      </InfoTile>
      <InfoTile icon={Hash} title="GST">
        33AAVFB2091D1ZK<br />
        <span className="text-bs-bone/50">Partnership firm est. 2019</span>
      </InfoTile>
    </section>
  );
}

function InfoTile({ icon: Icon, title, children }: any) {
  return (
    <div className="bg-bs-ink p-6 md:p-8">
      <div className="flex items-center gap-2 mb-3">
        <Icon size={14} strokeWidth={1.5} className="text-bs-gold/80" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-bs-gold/80">
          {title}
        </span>
      </div>
      <div className="font-sans text-sm text-bs-bone/85 leading-relaxed">{children}</div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  PRIMITIVES                                                           */
/* ──────────────────────────────────────────────────────────────────── */

function StepHeader({ index, label, hint }: { index: number; label: string; hint: string }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-plus text-bs-gold mb-3">
        <span>Floor 0{index}</span>
        <ChevronRight size={10} strokeWidth={2} />
        <span className="text-bs-bone/60">{label.replace(/&amp;/g, '&')}</span>
      </div>
      <h2 className="font-display italic text-3xl md:text-4xl text-bs-bone leading-tight">
        {label.replace(/&amp;/g, '&')}
      </h2>
      <p className="mt-2 font-sans text-sm text-bs-bone/55">{hint}</p>
    </div>
  );
}

function Field({
  label, error, hint, required, children,
}: {
  label: string; error?: string; hint?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-baseline justify-between mb-2">
        <label className="font-mono text-[10px] uppercase tracking-widest-plus text-bs-bone/70">
          {label} {required && <span className="text-bs-gold">*</span>}
        </label>
        {hint && !error && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-bs-bone/35 hidden md:inline">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-bs-ember">
          {error}
        </p>
      )}
      {hint && !error && (
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-bs-bone/35 md:hidden">
          {hint}
        </p>
      )}
    </div>
  );
}

const inputBaseClass =
  'w-full bg-bs-black/60 border border-bs-gold/20 focus:border-bs-gold focus:bg-bs-black px-4 py-3 ' +
  'font-sans text-base text-bs-bone placeholder:text-bs-bone/30 outline-none transition-colors rounded-sm';

import { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement, {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  icon?: any;
}>(function Input({ value, onChange, placeholder, type = 'text', icon: Icon }, ref) {
  return (
    <div className="relative">
      {Icon && (
        <Icon size={14} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-bs-gold/60 pointer-events-none" />
      )}
      <input
        ref={ref}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`${inputBaseClass} ${Icon ? 'pl-11' : ''}`}
      />
    </div>
  );
});

function Textarea({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className={inputBaseClass + ' resize-y min-h-[100px]'}
    />
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: any) => void; options: string[] }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className={inputBaseClass + ' appearance-none pr-8 cursor-pointer'}
    >
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function Pillset({
  value, onChange, options, allowEmpty,
}: {
  value: string; onChange: (v: string) => void; options: readonly string[]; allowEmpty?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {allowEmpty && (
        <PillButton active={value === ''} onClick={() => onChange('')}>{allowEmpty}</PillButton>
      )}
      {options.map(o => (
        <PillButton key={o} active={value === o} onClick={() => onChange(o)}>{o}</PillButton>
      ))}
    </div>
  );
}

function PillButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest-plus transition-colors border
        ${active
          ? 'bg-bs-gold text-bs-black border-bs-gold'
          : 'bg-bs-black/40 text-bs-bone/65 border-bs-gold/25 hover:border-bs-gold/60 hover:text-bs-bone'}`}
    >
      {children}
    </button>
  );
}

function TileButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-4 rounded-sm border transition-all text-left
        ${active
          ? 'bg-bs-gold/10 border-bs-gold shadow-[0_0_18px_rgba(212,175,106,0.25)]'
          : 'bg-bs-black/40 border-bs-gold/20 hover:border-bs-gold/60'}`}
    >
      <span className={`font-display text-base md:text-lg ${active ? 'text-bs-gold' : 'text-bs-bone/85'}`}>
        {children}
      </span>
      {active && (
        <Check size={14} strokeWidth={2} className="absolute top-3 right-3 text-bs-gold" />
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  CALL THE LIFT — submit button with sending state                     */
/* ──────────────────────────────────────────────────────────────────── */

function CallTheLiftButton({ sending, onClick }: { sending: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={sending}
      className="relative group overflow-hidden px-7 md:px-10 py-3 md:py-4 bg-bs-gold text-bs-black font-mono text-[11px] uppercase tracking-widest-plus disabled:cursor-wait"
    >
      <span className="relative z-10 flex items-center gap-2">
        {sending ? (
          <>
            <span className="inline-block w-3 h-3 rounded-full bg-bs-black/60 animate-pulse" />
            En route
          </>
        ) : (
          <>
            <Send size={12} strokeWidth={2} /> Call the Lift
          </>
        )}
      </span>
      {sending && (
        <span className="absolute inset-0 bg-bs-champagne/40 animate-pulse" aria-hidden />
      )}
    </button>
  );
}

/* ──────────────────────────────────────────────────────────────────── */
/*  UNUSED IMPORT GUARD                                                  */
/* ──────────────────────────────────────────────────────────────────── */
// Suppress unused-imports warnings for icons reserved for future steps.
void Weight; void Calendar; void MessageSquareText;
