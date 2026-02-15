import { type Meta, type StoryObj } from "@storybook/react";

import { Card } from "./Card";

/**
 * 콘텐츠 컨테이너. Card.Header, Card.Title, Card.Content, Card.Footer를
 * 네임스페이스 패턴으로 조합하여 다양한 레이아웃을 구성한다.
 */
const meta = {
	title: "Components/Card",
	component: Card,
	tags: ["autodocs"]
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/** 최소 구성. children만으로 카드를 렌더링한다. */
export const Default: Story = {
	args: {
		children: "기본 카드 콘텐츠입니다."
	}
};

/** 헤더 + 본문 구성. */
export const WithHeader: Story = {
	render: () => (
		<Card>
			<Card.Header>
				<Card.Title>카드 제목</Card.Title>
			</Card.Header>
			<Card.Content>카드 본문 내용이 들어갑니다.</Card.Content>
		</Card>
	),
	parameters: {
		docs: {
			source: {
				code: `<Card>
  <Card.Header>
    <Card.Title>카드 제목</Card.Title>
  </Card.Header>
  <Card.Content>카드 본문 내용이 들어갑니다.</Card.Content>
</Card>`
			}
		}
	}
};

/** 본문 + 푸터 구성. 날짜, 조회수 등 메타 정보를 표시한다. */
export const WithFooter: Story = {
	render: () => (
		<Card>
			<Card.Content>카드 본문 내용이 들어갑니다.</Card.Content>
			<Card.Footer>
				<span className="text-fg-muted text-xs">2024.01.15</span>
				<span className="text-fg-muted text-xs">조회 1,234</span>
			</Card.Footer>
		</Card>
	),
	parameters: {
		docs: {
			source: {
				code: `<Card>
  <Card.Content>카드 본문 내용이 들어갑니다.</Card.Content>
  <Card.Footer>
    <span>2024.01.15</span>
    <span>조회 1,234</span>
  </Card.Footer>
</Card>`
			}
		}
	}
};

/** 전체 구성. Header, Title, Content, Footer를 모두 포함한다. */
export const FullComposition: Story = {
	render: () => (
		<Card>
			<Card.Header>
				<Card.Title>전체 구성 카드</Card.Title>
				<span className="text-primary text-sm">더보기</span>
			</Card.Header>
			<Card.Content>
				네임스페이스 패턴으로 Card.Header, Card.Title, Card.Content, Card.Footer를 직관적으로 조합할 수 있습니다.
			</Card.Content>
			<Card.Footer>
				<span className="text-fg-muted text-xs">2024.01.15 14:30</span>
				<span className="text-fg-muted text-xs">42 responses</span>
			</Card.Footer>
		</Card>
	),
	parameters: {
		docs: {
			source: {
				code: `<Card>
  <Card.Header>
    <Card.Title>전체 구성 카드</Card.Title>
    <span>더보기</span>
  </Card.Header>
  <Card.Content>본문 내용</Card.Content>
  <Card.Footer>
    <span>2024.01.15 14:30</span>
    <span>42 responses</span>
  </Card.Footer>
</Card>`
			}
		}
	}
};
